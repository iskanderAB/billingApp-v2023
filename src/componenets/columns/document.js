const columns = [
    {
        title: 'Référence',
        width: 20,
        dataIndex: 'reference',
        key: 'ref',
        fixed: 'left',
    },
    {
        title: 'Date',
        width: 20,
        dataIndex: 'date',
        key: 'date',
        fixed: 'left',
    },
    {
        title: 'Client',
        width: 20,
        dataIndex: 'Person',
        key: 'Person',
    },
    {
        title: 'Montant TTC (TND)',
        width: 20,
        dataIndex: 'TTC',
        render: (v) => <span>{v}</span>,
        key: 'TTC', 
    },
    {
        title: 'État',
        width: 20,
        dataIndex: 'status',
        key: 'status', 
    },
    {
        title: 'Operation',
        key: 'operation',
        fixed: 'right',
        width: 20,
    },
];

export default columns; 