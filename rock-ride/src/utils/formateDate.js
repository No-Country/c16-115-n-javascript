import moment from 'moment'

export const formateDate = (date) => {
  
  const dateNow = moment(date).format('LL')

  return dateNow


}

export const formateDateUpdate = (date) => {
  const updateDate = moment(date).format("YYYY-MM-DD");

  return updateDate

}