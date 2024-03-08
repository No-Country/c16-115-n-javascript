

export function addressNameNumber(direccion) {
  // Divide la dirección en dos partes usando el último espacio como separador
  const parts = direccion.split(/\s+/g).reverse();
  const streetNumber = parts[0];
  const streetName = parts.slice(1).join(" ");

  // Retorna un objeto con la calle y el número
  return {
    streetName,
    streetNumber,
  };
}

export const scrollToTop = () => window.scrollTo( 0, 0 );

export const scrollToTopSmooth = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const getSlugName = (name) => name.replace(/ /g, "-").toLowerCase();

