import View from "./View.js";

const TabView = Object.create(View);
TabView.setup = function (el) {
	this.init(el);
	this.bindClick();
	return this;
};

TabView.bindClick = function () {
	this.el.addEventListener("click", (e) => {
		const tabName = e.target.dataset.name;
		if (tabName) {
			this.onClick(tabName);
		}
	});
};

TabView.onClick = function (tabName) {
	this.setActiveTab(tabName);
	this.emit("@change", { tabName });
};

TabView.setActiveTab = function (tabName) {
	for (const li of this.el.querySelectorAll("li")) {
		if (li.dataset.name === tabName) {
			li.classList.add("active");
			continue;
		}
		li.classList.remove("active");
	}
	this.show();
};
export default TabView;
