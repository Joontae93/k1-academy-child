import {
	API_URL,
	getElById,
	getFormVal,
	querySelector,
} from '../../modules/utilities';
import * as model from './model.js';
import FormView from './View';

// CONTROLLER
export const controller = {
	init: async function () {
		try {
			// 2. Load Form
			FormView.renderSpinner(FormView.courseContainer);
			await model.getCourseData('courses');
			FormView.showCourses(model.state.courses);

			// 3. Handle Submit
			FormView.addHandlerSubmit(this.submitForm);
		} catch (err) {
			console.error(err);
		}
	},
	/** onSubmit()
	 * 1. add data to model.state
	 * 3. create LMS assets
	 * 4. redirect user
	 * @param {object} data the data
	 */
	submitForm: async function (data) {
		model.state.form = { ...data };
		try {
			await model.createLMSAssets();
			// FormView.checkout(model.state.accessPlan.permalink);
		} catch (err) {
			console.error(err);
		}
	},
};
