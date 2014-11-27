var Async = (function() {

	function AsyncValue() {
		this.hasValue = false;
		this.callbacks = [];
	}

	AsyncValue.prototype.then = function(callback) {
		if(this.hasValue)
			callback(this.value);
		else
			this.callbacks.push(callback);
	};

	AsyncValue.prototype.setValue = function(value) {
		this.value = value;
		this.hasValue = true;
		
		for(var i in this.callbacks){
			var callback = this.callbacks[i];
			callback(value);
		}
		
		this.callbacks = [];
	};

	AsyncValue.prototype.toString = function() {
		if(this.hasValue) {
			if(this.value === null)
				return "(null)";
			else if(this.value === undefined) 
				return "(undefined)";
			else
				return this.value.toString();
		}
		else
			return "(not yet ready)";
	};
	
	function waitForValues(values) {
		var ret = new AsyncValue();
		wait();
		return ret;
		
		function wait() {
			//Count async values
			var asyncValuesCount = 0;
			var syncValues = [];
			for(var i in values) {
				var value = values[i];
				syncValues.push(value);
				if(value instanceof AsyncValue)
					asyncValuesCount++;
			}

			if(asyncValuesCount == 0) {
				//No async values, all is ready
				ret.setValue(syncValues);
			}
			else {
				//Wait for all async values to become ready
				for(var i in values) {
					var value = values[i];
					if(value instanceof AsyncValue)
						value.then(onValueReady(i));
				}
			}
			
			function onValueReady(i) {
				return function(value) {
					syncValues[i] = value;
					asyncValuesCount--;
					
					if(asyncValuesCount == 0) {
						//All async values are now ready
						ret.setValue(syncValues);
					}
				};
			}
		}
	};

	function callFunction(func, thisObject, args) {
		waitForValues(args).then(function(args) { 
			func.apply(thisObject, args); 
		});
	};


	return {
		Value: AsyncValue,
		wait: waitForValues,
		call: callFunction
	};
	
})();
