const strapi = require('@strapi/strapi');

async function setSiteSettingsPermissions() {
  const app = await strapi().load();
  
  try {
    console.log('🔐 Setting public permissions for Site Settings API...');

    // Find the public role
    const publicRole = await app.entityService.findMany('plugin::users-permissions.role', {
      filters: { type: 'public' }
    });

    if (!publicRole || publicRole.length === 0) {
      console.error('❌ Public role not found');
      return;
    }

    const publicRoleId = publicRole[0].id;
    console.log('📋 Public role ID:', publicRoleId);

    // Get current permissions
    const currentPermissions = await app.entityService.findMany('plugin::users-permissions.permission', {
      filters: { role: publicRoleId },
      populate: ['role']
    });

    console.log('📊 Current permissions count:', currentPermissions.length);

    // Check if site-setting permissions already exist
    const siteSettingPermissions = currentPermissions.filter(p => 
      p.action && p.action.includes('site-setting')
    );

    console.log('🎨 Existing site-setting permissions:', siteSettingPermissions.length);

    // Create site-setting permissions if they don't exist
    const actionsToCreate = [
      'api::site-setting.site-setting.find',
      'api::site-setting.site-setting.findOne'
    ];

    for (const action of actionsToCreate) {
      const existingPermission = currentPermissions.find(p => p.action === action);
      
      if (!existingPermission) {
        console.log(`➕ Creating permission: ${action}`);
        
        await app.entityService.create('plugin::users-permissions.permission', {
          data: {
            action: action,
            subject: null,
            properties: {},
            conditions: [],
            role: publicRoleId,
            enabled: true
          }
        });
        
        console.log(`✅ Created permission: ${action}`);
      } else {
        console.log(`📋 Permission already exists: ${action}`);
        
        // Make sure it's enabled
        if (!existingPermission.enabled) {
          await app.entityService.update('plugin::users-permissions.permission', existingPermission.id, {
            data: { enabled: true }
          });
          console.log(`✅ Enabled permission: ${action}`);
        }
      }
    }

    console.log('✅ Site Settings API permissions configured successfully!');
    console.log('🌐 Site Settings API is now publicly accessible');

  } catch (error) {
    console.error('❌ Error setting site settings permissions:', error);
  }
  
  process.exit(0);
}

setSiteSettingsPermissions();
