const data = [
	{
		id: 1,
		name: "[키친르쎌] 홈메이드 칠리소스 포크립 650g",
		image:
			"https://images.unsplash.com/photo-1602526212101-12eb978b129a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
	},
	{
		id: 2,
		name: "[키친르쎌] 이탈리아 파티 세트 3~4인분",
		image:
			"https://images.unsplash.com/photo-1605964883324-6d18a190faf3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
	},
];

export default {
	list(query) {
		return new Promise((res) => {
			setTimeout(() => {
				res(data);
			}, 200);
		});
	},
};
