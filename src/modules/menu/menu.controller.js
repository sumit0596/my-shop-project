const service = require('./menu.service');

exports.getAll = (req, res) => {
    res.json([
        {
            id: 1,
            name: 'Main',
            items: [
                {
                    id: 1,
                    name: 'Dashboard',
                    route: '/admin/dashboard',
                    icon: 'bi bi-grid-1x2'
                },
                {
                    id: 2,
                    name: 'Products',
                    route: '/admin/products',
                    icon: 'bi bi-box-seam'
                }
            ],
            parent: 1
        },
         {
            id: 2,
            name: 'Catalogue',
            items: [
                {
                    id: 1,
                    name: 'Settings',
                    route: '',
                    icon: 'bi bi-grid-1x2'
                },
                
            ],
            parent: 1
        },
    ]);
};

exports.create = async (req, res) => {
    try {
        const id = await service.createMenu(req.body);
        res.json({ message: 'Menu created', id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getMenus = async (req, res) => {
    const data = await service.getMenus();
    res.json(data);
};