'use strict'

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDate: [
    '2022-08-21T03:32:28.846Z',
    '2022-09-02T06:32:28.846Z',
    '2022-10-11T11:32:28.846Z',
    '2022-10-11T13:32:28.846Z',
    '2022-10-28T13:32:28.846Z',
    '2022-11-05T13:32:28.846Z',
    '2022-11-11T13:32:28.846Z',
    '2022-11-12T13:32:28.846Z',
  ],
  currency: 'USD',
  locale: 'en-US',
}

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDate: [
    '2022-08-21T03:32:28.846Z',
    '2022-09-02T06:32:28.846Z',
    '2022-10-11T11:32:28.846Z',
    '2022-10-11T13:32:28.846Z',
    '2022-10-28T13:32:28.846Z',
    '2022-11-05T13:32:28.846Z',
    '2022-11-11T13:32:28.846Z',
    '2022-11-12T13:32:28.846Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
}

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDate: [
    '2022-08-21T03:32:28.846Z',
    '2022-09-02T06:32:28.846Z',
    '2022-10-11T11:32:28.846Z',
    '2022-10-11T13:32:28.846Z',
    '2022-10-28T13:32:28.846Z',
    '2022-11-05T13:32:28.846Z',
    '2022-11-11T13:32:28.846Z',
    '2022-11-12T13:32:28.846Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP',
}

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDate: [
    '2022-10-11T13:32:28.846Z',
    '2022-10-28T13:32:28.846Z',
    '2022-11-05T13:32:28.846Z',
    '2022-11-11T13:32:28.846Z',
    '2022-11-12T13:32:28.846Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
}

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDate: [
    '2022-10-11T13:32:28.846Z',
    '2022-10-28T13:32:28.846Z',
    '2022-11-05T13:32:28.846Z',
    '2022-11-11T13:32:28.846Z',
    '2022-11-12T13:32:28.846Z',
  ],
  currency: 'USD',
  locale: 'en-US',
}

const accounts = [account1, account2, account3, account4, account5]

// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.total__value--in')
const labelSumOut = document.querySelector('.total__value--out')
const labelSumInterest = document.querySelector('.total__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerTransactions = document.querySelector('.transactions')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

//-------function  CorrectDate-----------------------------------------------------------------------------//
const formatDate = (date, locale) => {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'numeric', year: 'numeric' }).format(date)
}

const createCorrectDate = (date, locale) => {
  const getDaysBetween2Dates = (date1, date2) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24))
  const daysPassed = getDaysBetween2Dates(new Date(), date)
  if (daysPassed === 0) {
    return 'сьогодні'
  }
  if (daysPassed === 1) {
    return '1 день назад'
  }
  if (daysPassed <= 4) {
    return `${daysPassed} дні назад`
  } else {
    return formatDate(date, locale)
  }
}
//--------displayTransactions-------------------------------------------------------------------//
const numberFormat = (account, number) =>
  new Intl.NumberFormat(account.locale, { style: 'currency', currency: account.currency }).format(number)

const displayTransactions = function (account, sort) {
  const trans = sort ? account.transactions.slice().sort((x, y) => x - y) : account.transactions

  containerTransactions.innerHTML = ''
  trans.forEach(function (trans, index) {
    let transType = trans > 0 ? 'deposit' : 'withdrawal'
    const date = new Date(account.transactionsDate[index])
    const transDate = createCorrectDate(date, account.locale)
    const transFormat = numberFormat(account, trans)
    const transactionsRow = `
                              <div class="transactions__row">
                                 <div class="transactions__type transactions__type--${transType}">
                                    ${index + 1} ${transType}
                                 </div>
                                 <div class = "transactions__date">${transDate}</div>
                                 <div class="transactions__value">${transFormat}</div>
                              </div>`

    containerTransactions.insertAdjacentHTML('afterbegin', transactionsRow)
  })
}
//-------createNicknames---------------------------------------------------------------------------//

const createNicknames = accounts => {
  accounts.forEach(
    acc =>
      (acc.nickname = acc.userName
        .toLowerCase()
        .split(' ')
        .map(el => el[0])
        .join(''))
  )
}
createNicknames(accounts)
console.log(accounts)

//----------displayBalance------------------------------------------------------------------------//
const displayBalance = accaunt => {
  accaunt.balance = accaunt.transactions.reduce((acc, trans) => acc + trans, 0)
  const balanceFormat = numberFormat(accaunt, accaunt.balance)
  labelBalance.textContent = `${balanceFormat}`
}

//------displatTotal----------------------------------------------------------------------------//
const displayTotal = account => {
  const totalDeposit = account.transactions.filter(trans => trans > 0).reduce((acc, trans) => acc + trans, 0)
  const totalDepositFormat = numberFormat(currentAccount, totalDeposit)
  labelSumIn.textContent = `${totalDepositFormat}`

  const totalwithdrawal = account.transactions.filter(trans => trans < 0).reduce((acc, trans) => acc + trans, 0)
  const totalwithdrawalFormat = numberFormat(currentAccount, totalwithdrawal)
  labelSumOut.textContent = `${totalwithdrawalFormat}`

  const totalInterest = account.transactions
    .filter(trans => trans > 0)
    .map(trans => (trans * account.interest) / 100)
    .filter(interest => interest >= 5)
    .reduce((acc, trans) => acc + trans, 0)
  const totalInterestFormat = numberFormat(currentAccount, totalInterest)
  labelSumInterest.textContent = `${totalInterestFormat}`
}
//----updatetUi ------------------------------------------------------------------------------//
const updatetUi = function (account) {
  displayTransactions(account)
  displayBalance(account)
  displayTotal(account)
}
//-------btnLogin---------------------------------------------------------------------------/

let currentAccount, currentTimer

//-----------Always logged in-------
// currentAccount = account1
// updatetUi(currentAccount)
// containerApp.style.opacity = 1

// -----TimerFunction------------------------------
const startLogOutTimer = () => {
  let time = 300
  const logOutTimerCallback = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0)
    const sec = String(time % 60).padStart(2, 0)
    labelTimer.textContent = `${min}:${sec}`
    if (time === 0) {
      clearInterval(timer)
      containerApp.style.opacity = 0
      labelWelcome.textContent = 'Увійдіть у свій акаунт'
    }
    time--
  }
  logOutTimerCallback()
  const timer = setInterval(logOutTimerCallback, 1000)
  return timer
}
//-----------------------------
btnLogin.addEventListener('click', function (e) {
  e.preventDefault()
  currentAccount = accounts.find(accaunt => accaunt.nickname === inputLoginUsername.value)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    inputLoginPin.value = ''
    inputLoginPin.blur()
    inputLoginUsername.value = ''
    labelWelcome.textContent = `Раді що ви знову з нами, ${currentAccount.userName.split(' ')[0]}!`
    containerApp.style.opacity = 1
    //-----timer
    if (currentTimer) clearInterval(currentTimer)
    currentTimer = startLogOutTimer()

    updatetUi(currentAccount)
    //-----date
    const now = new Date()
    labelDate.textContent = formatDate(now, currentAccount.locale)
  }
})
//-------btnTransfer---------------------------------------------------------------------------//
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault()
  const transferAmount = Number(inputTransferAmount.value)
  const recipientNickname = inputTransferTo.value
  const recipientAccount = accounts.find(account => account.nickname === recipientNickname)
  if (
    recipientAccount &&
    recipientNickname !== currentAccount.nickname &&
    transferAmount > 0 &&
    transferAmount <= currentAccount.balance
  ) {
    inputTransferAmount.value = ''
    inputTransferTo.value = ''
    currentAccount.transactions.push(-transferAmount)
    recipientAccount.transactions.push(transferAmount)

    currentAccount.transactionsDate.push(new Date().toISOString())
    recipientAccount.transactionsDate.push(new Date().toISOString())
    updatetUi(currentAccount)
    //-----reset logOutTimer------
    clearInterval(currentTimer)
    currentTimer = startLogOutTimer()
  }
})
//--------btnClose--------------------------------------------------------------------------//
btnClose.addEventListener('click', function (e) {
  e.preventDefault()
  if (inputCloseUsername.value === currentAccount.nickname && Number(inputClosePin.value) === currentAccount.pin) {
    const currentAccountIndex = accounts.findIndex(account => account.nickname === currentAccount.nickname)
    accounts.splice(currentAccountIndex, 1)
    containerApp.style.opacity = 0
    inputCloseUsername.value = ''
    inputClosePin.value = ''
    labelWelcome.textContent = 'Увійдіть у свій акаунт'
  }
})
//-------btnLoan---------------------------------------------------------------------------//
btnLoan.addEventListener('click', function (e) {
  e.preventDefault()
  const loanAmount = Number(inputLoanAmount.value)
  if (loanAmount > 0 && currentAccount.transactions.some(trans => trans >= loanAmount * 0.1)) {
    setTimeout(() => {
      currentAccount.transactions.push(loanAmount)
      currentAccount.transactionsDate.push(new Date().toISOString())
      updatetUi(currentAccount)
    }, 5000)
  }
  inputLoanAmount.value = ''
  //-----reset logOutTimer------
  clearInterval(currentTimer)
  currentTimer = startLogOutTimer()
})
//---------btnSORT-------------------------------------------------------------------------//
let transactionSorted = false

btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  displayTransactions(currentAccount, !transactionSorted)
  transactionSorted = !transactionSorted
})
