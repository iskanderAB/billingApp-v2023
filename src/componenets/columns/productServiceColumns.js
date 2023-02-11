const columns = [
    {
        title: 'Type',
        width: 100,
        dataIndex: 'type',
        key: 'type',
        fixed: 'left',
        filters: [
            {
              text: 'Service',
              value: 'S',
            },
            {
              text: 'Produit',
              value: 'P',
            },
          ],
          onFilter: (value, record) => record.type.startsWith(value),
          filterSearch: true,
    },
    {
        title: 'Image',
        width: 100,
        dataIndex: 'image',
        key: 'image',
        render: (v) => <img src={v} width="80%" height="50px"/>,
        fixed: 'left',
    },
    {
        title: 'Libellé',
        dataIndex: 'designation',
        key: 'designation',
        width: 150,
    },
    {
        title: 'En Stock',
        dataIndex: 'stock',
        key: 'en stock',
        width: 150,
    },
    {
        title: 'Prix De Vente',
        dataIndex: 'price',
        key: 'PRIX DE VENTE',
        width: 150,
    },
    {
        title: "Prix d'achat",
        dataIndex: 'buyingPrice',
        key: 'buyingPrice',
        width: 150,
    },
    {
        title: 'Catégorie',
        dataIndex: 'Category',
        key: 'Category',
        width: 150,
    },
    {
        title: 'Marque',
        dataIndex: 'Mark',
        key: 'Mark',
        width: 150,
    },
    {
        title: 'TVA',
        dataIndex: 'tva',
        render: (v) => <span>{v} %</span>,
        key: 'TVA',
        width: 150,
    },
    {
        title: 'Operation',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];

export default columns ;