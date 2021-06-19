export function adjustInfo(data) {
  const newData = [];

  data.companies.map(comp => {
    comp.departments.map(item => {
      item.employees.map(emp => {
        emp.orders.map(ord => {
          const order = {
            id: ord.id,
            employeeName: emp.name,
            departmentDescription: item.description,
            items: ord.items,
            companyName: comp.businessName,
            printed: ord.printed,
            createdAt: ord.createdAt,
          };

          newData.push(order);
        });
      });
    });
  });

  return newData;
}
