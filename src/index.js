import c3 from 'c3';

months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

window.loadChart = function(json) {
	console.log("loadChart", json);
	const obj = JSON.parse(json);
	// console.log(obj);
	const data = obj.data;
	const chartType = obj.chartType;
	// console.log(chartType);

	const options = {
		bindto: '#chart',
		axis: {
			x: { type: 'category' },
			y: {}
		},
		size: {
			height: 480,
			width: 960
		
		},
		data: {
			onclick: function (d) {
				// console.log("data", d);

				// const index = d.index;
				// const name = d.name;
				// const value = d.value;
				const {index, name, value} = d;
				
				const month = months[index]
				const newObj = {month, name, value};
				// console.log("newObj", newObj);
				
				FileMaker.PerformScript("ChartClick", JSON.stringify(newObj));
			},
			labels: true,
			type: chartType,
			json: data,
			keys: {
				x: 'month',
				value: ['Apples', 'Peaches', 'Pears']
			}
			
		},

		padding: {
			bottom: 0
		
		}
		
	}

	const chart = c3.generate(options);

	window.transformChart = function(type) {
		chart.transform(type);
	}

	window.loadData = function(json) {
		const obj = JSON.parse(json);
		console.log(obj);
		const data = obj.data;
		console.log(data);
		chart.load({
			json: data,
			keys: {
				x: 'month',
				value: ['Bananas'],
			}
		})
	}

}


