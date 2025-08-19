import './DataTable.css'

const DataTable = ({
	data,
	columns,
	selectedItem,
	onSelect,
	currentPage = 1,
	itemsPerPage = 10,
}) => {
	const paginatedData = data.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const getValue = (item, column) => {
		if (column.accessor) {
			return column.accessor(item)
		}

		if (column.key.includes('.')) {
			const keys = column.key.split('.')
			return keys.reduce((obj, key) => obj?.[key], item)
		}

		return item[column.key]
	}

	return (
		<div className='table-container'>
			<table className='data-table'>
				<thead>
					<tr>
						{columns.map(column => (
							<th key={column.key}>{column.header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((item, index) => {
						const isSelected = selectedItem?.id === item.id
						return (
							<tr
								key={item.id || index}
								className={isSelected ? 'selected' : ''}
								onClick={() => onSelect && onSelect(item)}
							>
								{columns.map(column => {
									const value = getValue(item, column)
									const formattedValue = column.format
										? column.format(value)
										: value
									return <td key={column.key}>{formattedValue}</td>
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default DataTable
