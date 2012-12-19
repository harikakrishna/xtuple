/*jshint indent:2, curly:true eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true
white:true*/
/*global XT:true, XM:true, Backbone:true, _:true */

(function () {
  "use strict";

  /**
    @class

    @extends XM.Document
  */
  XM.GlobalDocument = XM.Document.extend(/** @lends XM.GlobalDocument.prototype */{

    autoFetchId: false,

    documentKey: 'id',

    enforceUpperKey: false,

    databaseType: 'global',

    /**
     * The username attribute must be editable for a new entry.
     */
    initialize: function (attributes, options) {
      XM.Document.prototype.initialize.apply(this, arguments);
      this.setReadOnly(this.documentKey, this.getStatus() !== XM.Model.READY_NEW);
    },

    findExisting: function (key, value, options) {
      var recordType = this.recordType || this.prototype.recordType,
        params = [ recordType, key, value, value + "1" ];
      this.dispatch('XM.Model', 'findExisting', params, options);
      return this;
    }

  });

  /**
    @class

    @extends XM.Model
  */
  XM.DatabaseServer = XM.GlobalDocument.extend(/** @lends XM.DatabaseServer.prototype */{

    recordType: 'XM.DatabaseServer',

    idAttribute: 'name',

    documentKey: 'name'

    /*
     XXX do we want this to be editable?
    readOnlyAttributes: [
      "dateAdded"
    ],
    */

  });

  /**
  Don't think this is used

  XM.Datasource = XM.Model.extend({

    recordType: 'XM.Datasource',

    idAttribute: 'name',

    databaseType: 'global',

    autoFetchId: false

  });

  */
  /**
    @class

    @extends XM.Model
  */
  XM.Extension = XM.GlobalDocument.extend(/** @lends XM.Extension.prototype */{

    recordType: 'XM.Extension',

    idAttribute: 'name',

    documentKey: 'name'
  });

  /**
    @class

    @extends XM.Model
  */
  XM.Organization = XM.GlobalDocument.extend(/** @lends XM.Organization.prototype */{

    recordType: 'XM.Organization',

    idAttribute: 'name',

    documentKey: 'name',

    defaults: {
      isActive: true
    },

    requiredAttributes: [
      "isActive",
      "licenses"
    ]

  });

  /**
    @class

    @extends XM.Model
  */
  XM.OrganizationExtension = XM.Model.extend({
    /** @scope XM.OrganizationExtension.prototype */

    recordType: 'XM.OrganizationExtension',

    databaseType: 'global'

  });

  /**
    @class

    @extends XM.Model
  */
  XM.Session = XM.Model.extend({
    /** @scope XM.Session.prototype */

    recordType: 'XM.Session',

    idAttribute: 'sid',

    databaseType: 'global',

    autoFetchId: false

  });

  /**
    @class

    @extends XM.Model
  */
  XM.SessionOrganization = XM.Model.extend({
    /** @scope XM.SessionOrganization.prototype */

    recordType: 'XM.SessionOrganization',

    databaseType: 'global'

  });


  /**
    @class

    @extends XM.GlobalDocument
  */
  XM.User = XM.GlobalDocument.extend(/** @lends XM.User.prototype */{

    recordType: 'XM.User',

    defaults: {
      isActive: true
    },

    requiredAttributes: [
      "isActive",
      "email"
    ]
  });

  /**
    @class

    @extends XM.Model
  */
  XM.UserOrganization = XM.Model.extend({
    /** @scope XM.UserOrganization.prototype */

    recordType: 'XM.UserOrganization',

    databaseType: 'global',

    requiredAttributes: [
      "name",
      "username"
    ]

  });

  /**
    @class

    @extends XM.Model
  */
  XM.GlobalPrivilege = XM.Model.extend(/** @lends XM.GlobalPrivilege.prototype */{

    recordType: 'XM.GlobalPrivilege',

    databaseType: 'global'

  });

  /**
    @class

    @extends XM.Model
  */
  XM.UserGlobalPrivilegeAssignment = XM.Model.extend(/** @lends XM.UserGlobalPrivilegeAssignment.prototype */{

    recordType: 'XM.UserGlobalPrivilegeAssignment',

    databaseType: 'global'

  });

  XM.OrganizationExtension = XM.Model.extend(/** @lends XM.OrganizationExtension.prototype */{

    recordType: 'XM.OrganizationExtension',

    databaseType: 'global'

  });

  // ..........................................................
  // COLLECTIONS
  //

  /**
    @class

    @extends XM.Collection
  */
  XM.DatabaseServerCollection = XM.Collection.extend({
    /** @scope XM.DatabaseServerCollection.prototype */

    model: XM.DatabaseServer

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.DatasourceCollection = XM.Collection.extend({
    /** @scope XM.DatasourceCollection.prototype */

    model: XM.DatabaseServer
  });

  /**
    @class

    @extends XM.Collection
  */
  XM.OrganizationCollection = XM.Collection.extend({
    /** @scope XM.OrganizationCollection.prototype */

    model: XM.Organization

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.SessionCollection = XM.Collection.extend({
    /** @scope XM.SessionCollection.prototype */

    model: XM.Session

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.UserCollection = XM.Collection.extend({
    /** @scope XM.UserCollection.prototype */

    model: XM.User

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.UserOrganizationCollection = XM.Collection.extend({
    /** @scope XM.UserOrganizationCollection.prototype */

    model: XM.UserOrganization

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.ExtensionCollection = XM.Collection.extend(/** @lends XM.SessionCollection.prototype */{

    model: XM.Extension

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.GlobalPrivilegeCollection = XM.Collection.extend(/** @lends XM.GlobalPrivilegeCollection.prototype */{

    model: XM.GlobalPrivilege

  });
}());
