export const toggleSwitch = (tipo, filters, setFilters) => {
    setFilters({ ...filters, [tipo]: !filters[tipo] });
  };
  