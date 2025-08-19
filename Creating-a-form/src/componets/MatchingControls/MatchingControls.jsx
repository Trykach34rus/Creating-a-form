import './MatchingControls.css'

const MatchingControls = ({
	selectedPayment,
	selectedInvoice,
	accountingComment,
	onCommentChange,
	onMatch,
	isMatched,
}) => {
	return (
		<div className='matching-controls'>
			<div className='selected-items'>
				<div className='selected-item'>
					<h3>Выбранный платеж</h3>
					{selectedPayment ? (
						<div>
							<p>
								<strong>№:</strong> {selectedPayment.id}
							</p>
							<p>
								<strong>Сумма:</strong>{' '}
								{selectedPayment.amount.toLocaleString()} ₽
							</p>
							<p>
								<strong>Заказчик:</strong> {selectedPayment.customer}
							</p>
						</div>
					) : (
						<p>Платеж не выбран</p>
					)}
				</div>

				<div className='selected-item'>
					<h3>Выбранный счет</h3>
					{selectedInvoice ? (
						<div>
							<p>
								<strong>№:</strong> {selectedInvoice.id}
							</p>
							<p>
								<strong>Сумма:</strong>{' '}
								{selectedInvoice.amount.toLocaleString()} ₽
							</p>
							<p>
								<strong>Заказчик:</strong> {selectedInvoice.customer}
							</p>
						</div>
					) : (
						<p>Счет не выбран</p>
					)}
				</div>
			</div>

			<div className='comment-section'>
				<h3>Комментарий бухгалтера</h3>
				<textarea
					value={accountingComment}
					onChange={e => onCommentChange(e.target.value)}
					placeholder='Введите комментарий...'
					rows='3'
				/>
			</div>

			<button
				className='match-button'
				onClick={onMatch}
				disabled={!selectedPayment || !selectedInvoice}
			>
				Сопоставить
			</button>

			{isMatched && (
				<div className='success-message'>
					✅ Платеж и счет успешно сопоставлены!
				</div>
			)}
		</div>
	)
}

export default MatchingControls
