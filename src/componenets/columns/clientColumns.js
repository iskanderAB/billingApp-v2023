const columns = [
    {
        title: 'Id',
        width: 20,
        dataIndex: 'id',
        key: 'id',
        fixed: 'left',
    },
    {
        title: 'Nom et Prénom',
        width: 20,
        dataIndex: 'fullName',
        key: 'fullName',
        fixed: 'left',
    },
    {
        title: 'Adresse',
        width: 20,
        dataIndex: 'Address',
        key: 'Address',
    },
    {
        title: 'Code TVA',
        width: 20,
        dataIndex: 'codeTVA',
        key: 'CodeTVA',
    },
    {
        title: 'Telephone',
        width: 20,
        dataIndex: 'tel',
        key: 'tel',
    },
    {
        title: 'Email',
        width: 20,
        dataIndex: 'email',
        key: 'email', 
    },
    {
        title: 'Operation',
        key: 'operation',
        fixed: 'right',
        width: 15,
    },
];

export default columns; 