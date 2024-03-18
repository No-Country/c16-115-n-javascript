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


export const loginSchema = yup.object().shape({
    email: yup.string().email('El correo no es válido').required('El correo es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
})


export const resetPasswordSchema = yup.object().shape({
    password: yup.string().required('La contraseña es obligatoria'),
    confirmPassword: yup.string().required('La contraseña es obligatoria')
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
})

export const sendEmailToResetPasswordSchema = yup.object().shape({
    email: yup.string().email('El correo no es válido').required('El correo es obligatorio'),
})


export const newEventSchema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    category: yup.string().required('La categoría es obligatoria'),
    date: yup.date('Debe ser de tipo date').required('La fecha es obligatoria'),
    country: yup.string().required('El país es obligatorio'),
    province: yup.string().required('La provincia es obligatoria'),
    city: yup.string().required('La ciudad es obligatoria'),
    streetName: yup.string().required('La calle es obligatoria'),
    streetNumber: yup.string().required('El número es obligatorio'),
    img: yup.mixed().required('La imagen es obligatoria'),
})

export const newTripSchema = yup.object().shape({
  datetime: yup.date().required('La fecha es obligatoria'),
  places: yup
    .number('Debe ser un número')
    .required('El número de lugares es obligatorio')
    .integer('Debe ser un número entero')
    .min(1, 'El número de lugares debe ser mayor o igual a 1')
    .max(4, 'El número máximo de lugares es 4'),
});

export const updateImageSchema = yup.object().shape({
  img: yup.mixed().required('La imagen es obligatoria'),
});

export const updateNameEventSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
});
export const updateCategoryEventSchema = yup.object().shape({
  category: yup.string().required('El nombre es obligatorio'),
});

export const updateDateEventSchema = yup.object().shape({
  date: yup.date('Debe ser de tipo date').required('La fecha es obligatoria'),
});

export const updateLocationEventSchema = yup.object().shape({
  country: yup.string().required('El país es obligatorio'),
  province: yup.string().required('La provincia es obligatoria'),
  city: yup.string().required('La ciudad es obligatoria'),
  streetName: yup.string().required('La calle es obligatoria'),
  streetNumber: yup.string(),
})


export const editUserInfoSchema = yup.object().shape({
  fullName: yup.string()
    .max(50, 'El nombre es muy largo'),
  email: yup.string()
    .email('El correo no es válido'),
  country: yup.string(),
  province: yup.string(),
  city: yup.string(),
  streetName: yup.string(),
  streetNumber: yup.string(),
  isDriver: yup.boolean(),
  plate: yup.string().when( 'isDriver', {
    is: (isDriver) => isDriver === true,
    then:() => yup.string().required('La placa es obligatoria'),
    otherwise: () => yup.string().nullable()
  } ),
  password: yup.string(),
  favoriteArtists: yup.array(),
  favoriteSong: yup.string().nullable(),
})

export const addCarPhotos = yup.object().shape({
  carPhotos: yup.array({
    type: yup.mixed(),
  }),
})