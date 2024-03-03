

export const timeOutMessage = ( fn, message ) => {
  console.log(message);
  fn(message)
  setTimeout(() => {
    fn('')
  }, 4000)
}