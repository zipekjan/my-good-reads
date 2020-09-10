// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';

declare global {
	namespace NodeJS {
		interface Global {
			fetch: any
		}
	}
}

// Makes testing promises easier
chai.use(chaiAsPromised);
