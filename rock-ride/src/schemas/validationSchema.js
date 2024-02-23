import * as yup from "yup"
// import { branch } from "yup"





export const registerSchema = yup.object().shape({
  fullName: yup.string()
    .max(50, 'El nombre es muy largo')
    .required('El nombre es obligatorio'),
  email: yup.string()
    .email('El correo no es válido')
    .required('El correo es obligatorio'),
  country: yup.string().required('El país es obligatorio'),
  province: yup.string().required('La provincia es obligatoria'),
  city: yup.string().required('La ciudad es obligatoria'),
  streetName: yup.string().required('La calle es obligatoria'),
  streetNumber: yup.string().required('El número es obligatorio'),
  isDriver: yup.boolean(),
  plate: yup.string().when( 'isDriver', {
    is: (isDriver) => isDriver === true,
    then:() => yup.string().required('La placa es obligatoria'),
    otherwise: () => yup.string().nullable()
  } ),
  password: yup.string().required('La contraseña es obligatoria'),

})
  // .object({
  //   fullName: {
  //     required: 'El nombre es obligatorio',
  //     minLength: 3,
  //   },
  //   email: {
  //     required: 'El correo electrónico es obligatorio',
  //     pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  //   },
  //   streetName: {
  //     required: 'La calle es obligatoria',
  //   }
  // })
  // .required()