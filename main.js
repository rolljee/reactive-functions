const EventEmitter = require('events').EventEmitter;
const _ = require('lodash');

export default class ReactiveFunc {
	constructor(func) {
		this._func = func;
		this.lastModified;
        this.lastValue;
        this.value;
		this.emitter = new EventEmitter();
	}

	set(args) {
		this._func.call(this, args);
		this.lastValue = args;
		this.emitter.emit('added', args);
	}

	isModified() {
		if (!_.isEqual(this._func.call(), this.lastModified)) {
			this.lastModified = this._func.call();
			this.emitter.emit('modified');
		}
	}
	monitor(monitoringInterval) {
		this.interval = setInterval(this.isModified.bind(this), monitoringInterval);
	}

	dispose() {
		clearInterval(this.interval);
	}
}
