export default {
	data: [
		{ keyword: "검색기록2", date: "12.03" },
		{ keyword: "검색기록1", date: "12.02" },
		{ keyword: "검색기록0", date: "12.01" },
	],

	list() {
		return Promise.resolve(this.data);
	},

	add(keyword = "") {
		keyword = keyword.trim();
		if (!keyword) return;
		if (this.data.some((item) => item.keyword === keyword)) {
			this.remove(keyword);
		}

		const d = new Date();
		const y = d.getFullYear().toString().slice(2);
		const m = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + d.getMonth() + 1;

		const date = `${y}.${m}`;
		this.data = [{ keyword, date }, ...this.data];
	},

	remove(keyword) {
		this.data = this.data.filter((item) => item.keyword !== keyword);
	},
};
