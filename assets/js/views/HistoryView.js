import KeywordView from "./KeywordView.js";

const HistoryView = Object.create(KeywordView);

HistoryView.render = function (data = []) {
	this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : "최근 검색어가 없습니다.";
	this.bindEvents();
	this.show();
};

HistoryView.bindEvents = function () {
	this.el.addEventListener("click", (e) => {
		const targetNodeName = e.target.nodeName;
		const keyword = e.target.dataset.keyword;
		if (targetNodeName === "LI" && keyword) {
			this.onClickKeyword(keyword);
		} else if (targetNodeName === "BUTTON" && keyword) {
			this.deleteHistory(keyword);
		}
	});
};

HistoryView.deleteHistory = function (keyword) {
	this.emit("@delete", { keyword });
};

HistoryView.getKeywordsHtml = function (data) {
	return (
		data.reduce((html, item, i) => {
			html += `
                <li data-keyword=${item.keyword}>
                    <span class="number">${i + 1}</span>
                    ${item.keyword}
                    <span class="date">${item.date}</span>
                    <button class="btn-remove" data-keyword=${item.keyword}></button>
                </li>`;
			return html;
		}, "<ul class='list'>") + "</ul>"
	);
};

export default HistoryView;
