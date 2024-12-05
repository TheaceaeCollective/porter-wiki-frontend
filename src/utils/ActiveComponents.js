
import Events from "@/utils/Events";
export default class ActiveComponents {
	static active = [];

	static open(name) {
		this.active.push(name);
	}

	static close() {
		if (this.active.length > 0) {
			const name = this.active.pop();
			Events.Emit(name + "-close", null);
		}
	}
}