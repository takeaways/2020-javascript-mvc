import View from "./View.js";

const ResultView = Object.create(View);

ResultView.messages = {
	NO_RESULT: "검색 결과가 없습니다.",
};

ResultView.setup = function (el) {
	this.init(el);
};

ResultView.render = function (data = []) {
	this.el.innerHTML = data.length ? this.getSearchResultHtml(data) : this.messages.NO_RESULT;
};

ResultView.getSearchResultHtml = function (data) {
	return (
		data.reduce((html, item) => {
			html += this.getSearchItemHtml(item);
			return html;
		}, "<ul>") + "</ul>"
	);
};

ResultView.getSearchItemHtml = (item) => `
    <li>
        <img src="${item.image}">
        <p>${item.name}</p>
    </li>
`;

export default ResultView;
