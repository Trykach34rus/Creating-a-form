import { useEffect, useState } from 'react'
import DataTable from '../DataTable/DataTable.jsx'
import MatchingControls from '../MatchingControls/MatchingControls.jsx'
import Pagination from '../Pagination/Pagination.jsx'
import './AccountingMatching.css'

const mockPayments = [
	{
		id: 1,
		createdDate: '2024-01-15',
		type: 'электронный',
		amount: 15000,
		customer: 'ООО "Ромашка"',
		customerINN: '7712345678',
		executor: 'АНО ДПО "Центр Обучения"',
		executorINN: '7709876543',
		examinee: 'Иванов Иван Иванович',
		paymentComment: 'Оплата за обучение сотрудника',
		accountingComment: '',
	},
	{
		id: 2,
		createdDate: '2024-01-16',
		type: 'наличный',
		amount: 5000,
		customer: 'ИП Петров П.С.',
		customerINN: '7723456789',
		executor: 'АНО ДПО "Центр Обучения"',
		executorINN: '7709876543',
		examinee: 'Петрова Мария Сергеевна',
		paymentComment: 'Предоплата за курс',
		accountingComment: '',
	},
]

// Mock данные для счетов
const mockInvoices = [
	{
		id: 1,
		type: 'обучение',
		examinee: 'Иванов Иван Иванович',
		qualification: 'ПК-123',
		amount: 15000,
		customer: 'ООО "Ромашка"',
		customerINN: '7712345678',
		executor: 'АНО ДПО "Центр Обучения"',
		executorINN: '7709876543',
		paymentPurpose:
			'Оплата обучения по программе "Профессиональная переподготовка"',
	},
	{
		id: 2,
		type: 'пошлина',
		examinee: 'Петрова Мария Сергеевна',
		qualification: 'АК-456',
		amount: 5000,
		customer: 'ИП Петров П.С.',
		customerINN: '7723456789',
		executor: 'АНО ДПО "Центр Обучения"',
		executorINN: '7709876543',
		paymentPurpose: 'Оплата госпошлины за аттестацию',
	},
]

const AccountingMatching = () => {
	const [payments, setPayments] = useState([])
	const [invoices, setInvoices] = useState([])
	const [selectedPayment, setSelectedPayment] = useState(null)
	const [selectedInvoice, setSelectedInvoice] = useState(null)
	const [currentPaymentPage, setCurrentPaymentPage] = useState(1)
	const [currentInvoicePage, setCurrentInvoicePage] = useState(1)
	const [accountingComment, setAccountingComment] = useState('')
	const [isMatched, setIsMatched] = useState(false)
	const [matchedPairs, setMatchedPairs] = useState([])

	const itemsPerPage = 5

	useEffect(() => {
		setPayments(mockPayments)
		setInvoices(mockInvoices)
	}, [])

	const handlePaymentSelect = payment => {
		setSelectedPayment(payment)
		setAccountingComment(payment.accountingComment || '')
	}

	const handleInvoiceSelect = invoice => {
		setSelectedInvoice(invoice)
	}

	const handleMatch = () => {
		if (selectedPayment && selectedInvoice) {
			const newPair = {
				payment: selectedPayment,
				invoice: selectedInvoice,
				accountingComment: accountingComment,
				matchDate: new Date().toLocaleString(),
			}

			setMatchedPairs([...matchedPairs, newPair])
			setIsMatched(true)

			setTimeout(() => {
				setSelectedPayment(null)
				setSelectedInvoice(null)
				setAccountingComment('')
				setIsMatched(false)
			}, 2000)
		}
	}

	return (
		<div className='accounting-matching'>
			<h1>Сопоставление счетов и платежей</h1>

			<div className='matching-container'>
				<div className='payments-section'>
					<h2>Платежи</h2>
					<DataTable
						data={payments}
						currentPage={currentPaymentPage}
						itemsPerPage={itemsPerPage}
						selectedItem={selectedPayment}
						onSelect={handlePaymentSelect}
						columns={[
							{ key: 'id', header: '№' },
							{ key: 'createdDate', header: 'Дата создания' },
							{ key: 'type', header: 'Тип' },
							{
								key: 'amount',
								header: 'Сумма',
								format: value => `${value.toLocaleString()} ₽`,
							},
							{ key: 'customer', header: 'Заказчик' },
							{ key: 'examinee', header: 'ФИО экзаменуемого' },
						]}
					/>

					<Pagination
						currentPage={currentPaymentPage}
						totalPages={Math.ceil(payments.length / itemsPerPage)}
						onPageChange={setCurrentPaymentPage}
					/>
				</div>

				<div className='invoices-section'>
					<h2>Счета</h2>
					<DataTable
						data={invoices}
						currentPage={currentInvoicePage}
						itemsPerPage={itemsPerPage}
						selectedItem={selectedInvoice}
						onSelect={handleInvoiceSelect}
						columns={[
							{ key: 'id', header: '№' },
							{ key: 'type', header: 'Тип' },
							{
								key: 'amount',
								header: 'Сумма',
								format: value => `${value.toLocaleString()} ₽`,
							},
							{ key: 'customer', header: 'Заказчик' },
							{ key: 'examinee', header: 'ФИО экзаменуемого' },
							{ key: 'qualification', header: 'Квалификация' },
						]}
					/>

					<Pagination
						currentPage={currentInvoicePage}
						totalPages={Math.ceil(invoices.length / itemsPerPage)}
						onPageChange={setCurrentInvoicePage}
					/>
				</div>
			</div>

			<MatchingControls
				selectedPayment={selectedPayment}
				selectedInvoice={selectedInvoice}
				accountingComment={accountingComment}
				onCommentChange={setAccountingComment}
				onMatch={handleMatch}
				isMatched={isMatched}
			/>

			{matchedPairs.length > 0 && (
				<div className='matched-pairs'>
					<h2>Сопоставленные пары</h2>
					<DataTable
						data={matchedPairs}
						columns={[
							{
								key: 'payment.id',
								header: 'Платеж №',
								accessor: item => item.payment.id,
							},
							{
								key: 'invoice.id',
								header: 'Счет №',
								accessor: item => item.invoice.id,
							},
							{
								key: 'amount',
								header: 'Сумма',
								accessor: item => item.payment.amount,
								format: value => `${value.toLocaleString()} ₽`,
							},
							{
								key: 'customer',
								header: 'Заказчик',
								accessor: item => item.payment.customer,
							},
							{ key: 'matchDate', header: 'Дата сопоставления' },
							{ key: 'accountingComment', header: 'Комментарий' },
						]}
					/>
				</div>
			)}
		</div>
	)
}

export default AccountingMatching
