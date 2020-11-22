import View from "./View.js";

const KeywordView = Object.create(View);

KeywordView.setup = function (el) {
	this.init(el);
	return this;
};

KeywordView.bindEvents = function () {
	this.el.addEventListener("click", (e) => {
		const keyword = e.target.dataset.keyword;
		if (keyword) {
			this.onClickKeyword(keyword);
		}
	});
};

KeywordView.onClickKeyword = function (keyword) {
	KeywordView.emit("@click", { keyword });
};

KeywordView.render = function (data = []) {
	this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : "추천 검색어가 없습니다.";
	this.bindEvents();
	this.show();
};

KeywordView.getKeywordsHtml = function (data) {
	return (
		data.reduce((html, item, i) => {
			html += `
                <li data-keyword=${item.keyword}>
                    <span class="number">${i + 1}</span>
                    ${item.keyword}
                </li>`;
			return html;
		}, "<ul class='list'>") + "</ul>"
	);
};
export default KeywordView;
