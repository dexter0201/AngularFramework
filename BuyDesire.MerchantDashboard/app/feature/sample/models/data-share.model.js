(function () {
	'use strict';

	var modelID = 'dataShareModel';
	angular
        .module('app')
        .service(modelID, dataShareModel);//modelName is the same with modelID

	//dataShareModel.$inject = [];

	/**
	 * DataShareModel Class
	 *
	 * Share data, commuicating between scopes
	 */
	function dataShareModel()
	{
		// Private property
		var _data = [];

		//#region Method
		// Public method
		this.set = function (key, value)
		{
			_data[key] = value;
		};

		// Public method
		this.get = function (key)
		{
			return _data[key];
		};

		this.empty = function ()
		{
			_data = [];
		}
		//#endregion

		return this;
	}
})();