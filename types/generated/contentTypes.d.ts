import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiApartmentApartment extends Schema.CollectionType {
  collectionName: 'apartments';
  info: {
    singularName: 'apartment';
    pluralName: 'apartments';
    displayName: 'Apartment';
    description: 'Real estate apartment listings';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    slug: Attribute.UID<'api::apartment.apartment', 'name'> &
      Attribute.Required;
    project: Attribute.Relation<
      'api::apartment.apartment',
      'manyToOne',
      'api::project.project'
    > &
      Attribute.Required;
    price: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    currency: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 10;
      }> &
      Attribute.DefaultTo<'$'>;
    description: Attribute.Text & Attribute.Required;
    shortDescription: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    status: Attribute.Enumeration<
      ['available', 'sold', 'reserved', 'pending']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'available'>;
    bedrooms: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    bathrooms: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    area: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    areaUnit: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }> &
      Attribute.DefaultTo<'sq ft'>;
    floor: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    totalFloors: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    yearBuilt: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 1800;
        max: 2030;
      }>;
    features: Attribute.JSON;
    images: Attribute.Media;
    mainImage: Attribute.Media;
    isFeatured: Attribute.Boolean & Attribute.DefaultTo<false>;
    whatsappMessage: Attribute.Text;
    contactPhone: Attribute.String & Attribute.DefaultTo<'+96178858784'>;
    coordinates: Attribute.JSON;
    address: Attribute.String;
    propertyType: Attribute.Enumeration<['simplex', 'duplex', 'shops']> &
      Attribute.Required;
    furnishing: Attribute.Enumeration<
      ['furnished', 'semi-furnished', 'unfurnished']
    > &
      Attribute.DefaultTo<'unfurnished'>;
    parking: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    balcony: Attribute.Boolean & Attribute.DefaultTo<false>;
    garden: Attribute.Boolean & Attribute.DefaultTo<false>;
    pool: Attribute.Boolean & Attribute.DefaultTo<false>;
    gym: Attribute.Boolean & Attribute.DefaultTo<false>;
    security: Attribute.Boolean & Attribute.DefaultTo<false>;
    elevator: Attribute.Boolean & Attribute.DefaultTo<false>;
    view: Attribute.Enumeration<
      ['mountain', 'sea', 'city', 'garden', 'street', 'pool']
    >;
    heating: Attribute.Enumeration<['central', 'individual', 'none']> &
      Attribute.DefaultTo<'none'>;
    cooling: Attribute.Enumeration<['central', 'individual', 'none']> &
      Attribute.DefaultTo<'none'>;
    internet: Attribute.Boolean & Attribute.DefaultTo<false>;
    cable: Attribute.Boolean & Attribute.DefaultTo<false>;
    satellite: Attribute.Boolean & Attribute.DefaultTo<false>;
    waterHeater: Attribute.Boolean & Attribute.DefaultTo<false>;
    generator: Attribute.Boolean & Attribute.DefaultTo<false>;
    solarPanels: Attribute.Boolean & Attribute.DefaultTo<false>;
    storage: Attribute.Boolean & Attribute.DefaultTo<false>;
    maidRoom: Attribute.Boolean & Attribute.DefaultTo<false>;
    studyRoom: Attribute.Boolean & Attribute.DefaultTo<false>;
    guestRoom: Attribute.Boolean & Attribute.DefaultTo<false>;
    terrace: Attribute.Boolean & Attribute.DefaultTo<false>;
    rooftop: Attribute.Boolean & Attribute.DefaultTo<false>;
    basement: Attribute.Boolean & Attribute.DefaultTo<false>;
    attic: Attribute.Boolean & Attribute.DefaultTo<false>;
    fireplace: Attribute.Boolean & Attribute.DefaultTo<false>;
    jacuzzi: Attribute.Boolean & Attribute.DefaultTo<false>;
    sauna: Attribute.Boolean & Attribute.DefaultTo<false>;
    wineCellar: Attribute.Boolean & Attribute.DefaultTo<false>;
    homeTheater: Attribute.Boolean & Attribute.DefaultTo<false>;
    library: Attribute.Boolean & Attribute.DefaultTo<false>;
    office: Attribute.Boolean & Attribute.DefaultTo<false>;
    playroom: Attribute.Boolean & Attribute.DefaultTo<false>;
    laundry: Attribute.Boolean & Attribute.DefaultTo<false>;
    kitchenType: Attribute.Enumeration<['open', 'closed', 'semi-open']> &
      Attribute.DefaultTo<'closed'>;
    kitchenAppliances: Attribute.JSON;
    bathroomFeatures: Attribute.JSON;
    flooring: Attribute.Enumeration<
      ['marble', 'tile', 'wood', 'carpet', 'concrete', 'mixed']
    >;
    windows: Attribute.Enumeration<
      ['double-glazed', 'single-glazed', 'triple-glazed']
    > &
      Attribute.DefaultTo<'single-glazed'>;
    doors: Attribute.Enumeration<['wood', 'metal', 'glass', 'mixed']> &
      Attribute.DefaultTo<'wood'>;
    ceilingHeight: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    orientation: Attribute.Enumeration<
      [
        'north',
        'south',
        'east',
        'west',
        'northeast',
        'northwest',
        'southeast',
        'southwest'
      ]
    >;
    energyRating: Attribute.Enumeration<['A', 'B', 'C', 'D', 'E', 'F', 'G']> &
      Attribute.DefaultTo<'C'>;
    maintenanceFee: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    maintenanceFeePeriod: Attribute.Enumeration<
      ['monthly', 'quarterly', 'yearly']
    > &
      Attribute.DefaultTo<'monthly'>;
    propertyTax: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    insurance: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    utilities: Attribute.JSON;
    nearbyAmenities: Attribute.JSON;
    transportation: Attribute.JSON;
    schools: Attribute.JSON;
    hospitals: Attribute.JSON;
    shopping: Attribute.JSON;
    restaurants: Attribute.JSON;
    entertainment: Attribute.JSON;
    sports: Attribute.JSON;
    cultural: Attribute.JSON;
    religious: Attribute.JSON;
    government: Attribute.JSON;
    business: Attribute.JSON;
    financial: Attribute.JSON;
    legal: Attribute.JSON;
    technical: Attribute.JSON;
    marketing: Attribute.JSON;
    virtualTour: Attribute.String;
    videoUrl: Attribute.String;
    floorPlan: Attribute.Media;
    documents: Attribute.Media;
    availabilityDate: Attribute.Date;
    inspectionDate: Attribute.DateTime;
    openHouse: Attribute.JSON;
    priceHistory: Attribute.JSON;
    marketAnalysis: Attribute.JSON;
    investmentPotential: Attribute.JSON;
    rentalYield: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    capitalGrowth: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    notes: Attribute.Text;
    internalNotes: Attribute.Text;
    tags: Attribute.JSON;
    seoTitle: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    seoDescription: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    seoKeywords: Attribute.String;
    views: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    favorites: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    inquiries: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    lastViewed: Attribute.DateTime;
    featuredUntil: Attribute.DateTime;
    promoted: Attribute.Boolean & Attribute.DefaultTo<false>;
    promotedUntil: Attribute.DateTime;
    priority: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }> &
      Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::apartment.apartment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::apartment.apartment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'Project';
    description: 'Real estate development projects';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    slug: Attribute.UID<'api::project.project', 'name'> & Attribute.Required;
    description: Attribute.Text;
    status: Attribute.Enumeration<['available', 'sold_out']> &
      Attribute.Required &
      Attribute.DefaultTo<'available'>;
    units: Attribute.Relation<
      'api::project.project',
      'oneToMany',
      'api::unit.unit'
    >;
    mainImage: Attribute.Media;
    images: Attribute.Media;
    priority: Attribute.Integer & Attribute.DefaultTo<0>;
    propertyTypeInfo: Attribute.JSON;
    propertyTypes: Attribute.Relation<
      'api::project.project',
      'manyToMany',
      'api::property-type.property-type'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPropertyTypePropertyType extends Schema.CollectionType {
  collectionName: 'property_types';
  info: {
    singularName: 'property-type';
    pluralName: 'property-types';
    displayName: 'Property Type';
    description: 'Property types like simplex, duplex, shops with their specifications';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.Enumeration<['simplex', 'duplex', 'shops']> &
      Attribute.Required &
      Attribute.Unique;
    displayName: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    image: Attribute.Media;
    icon: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    features: Attribute.JSON;
    projects: Attribute.Relation<
      'api::property-type.property-type',
      'manyToMany',
      'api::project.project'
    >;
    priority: Attribute.Integer & Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::property-type.property-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::property-type.property-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUnitUnit extends Schema.CollectionType {
  collectionName: 'units';
  info: {
    singularName: 'unit';
    pluralName: 'units';
    displayName: 'Unit';
    description: 'Individual units within projects (Simplex, Duplex, Shops)';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['simplex', 'duplex', 'shop']> &
      Attribute.Required;
    size_min: Attribute.Integer & Attribute.Required;
    size_max: Attribute.Integer & Attribute.Required;
    status: Attribute.Enumeration<['available', 'sold']> &
      Attribute.Required &
      Attribute.DefaultTo<'available'>;
    project: Attribute.Relation<
      'api::unit.unit',
      'manyToOne',
      'api::project.project'
    >;
    price: Attribute.Decimal;
    description: Attribute.Text;
    images: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::unit.unit', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::unit.unit', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::apartment.apartment': ApiApartmentApartment;
      'api::project.project': ApiProjectProject;
      'api::property-type.property-type': ApiPropertyTypePropertyType;
      'api::unit.unit': ApiUnitUnit;
    }
  }
}
