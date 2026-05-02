const repo = require('./menu.repository');
const pool = require('../../common/db/mysql');

exports.createMenu = async (data) => {
    
    if (!data.name || !data.icon ) {
        throw new Error('Missing required fields');
    }

    return repo.create(data);
};


exports.getMenus = async (type) => {
  return await repo.findByType();
};