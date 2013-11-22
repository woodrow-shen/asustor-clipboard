/* Copyright (c) 2011 Asustor Inc. All rights reserved. */

Ext.ns('AS.ARC.clipboard');

/**
 * @class AS.ARC.apps.clipboard.core
 * @extends Ext.util.Observable
 * <p>core</p>
 */
Ext.define('AS.ARC.apps.clipboard.core', {
	extend: 'Ext.util.Observable',

	
	constructor: function (config) {
		Ext.apply(this, config);
		this.callParent();

		this.init();
	},
	
	init: function () {
		var fn = this;
		
		fn.win = fn.desktop.createWindow({
			app: fn.app,
			id: fn.id,
			itemId: fn.id,
			width: 880,
			height: 520,
			resizable: false,
			border: false,
			bodyStyle: 'padding: 0; border: none; background: #FFFFFF;',
			items: [{
				xtype: 'toolbar',
				items: [{
					text: 'Save',
					handler: function () {
						// save
						var value = fn.win.items.get('text').getValue();
						
						 AS.ARC.ajax({
							 url: AS.ARC.util.getApiUrlWithSid('/apps/clipboard' + '/' + 'clipboard.cgi', {}),
							 params: {
								 'act': 'set',
								 'text': value
							 },
							 method: 'post',
							 success: function (json, opts) {
								 //fn.win.items.get('text').setValue(json.text);
							 },
							 failure: function (json, opts) {

							 }
						 });
						
					}
				}]
			}, {
				xtype: 'textareafield',
				itemId: 'text',
				enableKeyEvents: true,
				height: 450,
				width: 878
			}],
			listeners: {        
				afterrender: function (win) {
					// TODO: on load
					console.info('load');
					
					AS.ARC.ajax({
						url: AS.ARC.util.getApiUrlWithSid('/apps/clipboard' + '/' + 'clipboard.cgi', {}),
						params: {
							act: 'get'                             
						},
						method: 'post',
						success: function (json, opts) {
              console.info(json.text);
							win.items.get('text').setValue(json.text);
						},
						failure: function (json, opts) {

						}
					});
				}
			}
		});
	}
});

/**
 * @class AS.ARC.apps.clipboard.main
 * @extends AS.ARC._appBase
 * <p>Main app</p>
 */
Ext.define('AS.ARC.apps.clipboard.main', {
	extend: 'AS.ARC._appBase',

	appTag: 'clipboard',
	title: 'clipboard',
	appMaxNum: 1,
	appOpenNum: 0,
	appIsReady: true,
	appWins: [],
	
	createWindow: function () {
		var desktop = this.core.getDesktop(),			
			app = this;
		
		if ((this.appOpenNum === this.appMaxNum) || !this.appIsReady) {
			this.appWins[0].show();
			return;
		}
		
		// Set appIsReady to false
		this.appIsReady = false;

		var newclipboard = new AS.ARC.apps.clipboard.core({
			app: this,
			desktop: desktop,
			id: this.id + '-' + Ext.id()
		});
		
		newclipboard.win.on('render', function () {
			app.appOpenNum++;
			app.appIsReady = true;
		});		
	
		newclipboard.win.on('beforeclose', function () {
			app.appOpenNum--;
			app.appIsReady = true;
			app.appWins.pop();
		});		
		newclipboard.win.show();
		
		// Get all wins for handling
		this.appWins.push(newclipboard.win);
	}
});