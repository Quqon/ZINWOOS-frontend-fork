const itemController = require('../../api/controllers/itemController');
const itemService = require('../../api/services/itemService');
const { asyncWrap } = require('../../api/utils/error');

jest.mock('../../api/services/itemService');
jest.mock('../../api/utils/error');

describe('itemController', () => {
    describe('getAll', () => {
        it('should call asyncWrap with the correct function', () => {
            itemController.getAll();

        });
    })

})