const rowdata = document.getElementById("rowdata");
const select = document.querySelector(".input1");
const input2 = document.querySelector(".input2");

async function fetchData() {
  try {
    const response = await fetch(`../data.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setName(data);
  } catch (error) {
    console.error(error);
  }
}

function setName(data) {
  const { customers, transactions } = data;

  customers.forEach((custmor) => {
    const idCustmor = custmor.id;

    transactions.forEach((el) => {
      const id3 = el.customer_id;
      if (idCustmor === id3) {
        el.name = custmor.name;
      }
    });
  });

  renderTable(transactions);
  customers.forEach((el) => {
    const html = `<option value="${el.name}">${el.name}</option>`;
    select.insertAdjacentHTML("beforeend", html);
  });

  select.addEventListener("change", function () {
    let arr = [];
    const data = select.value;
    let cartona = " ";
    transactions.forEach((el) => {
      if (el.name.toLowerCase().includes(data.toLowerCase())) {
        cartona += `
        <tr>
          <td>${el.customer_id}</td>
          <td>${el.name}</td>
          <td>${el.date}</td>
          <td>${el.amount}</td>
           </tr>
  `;
        arr.push(el);
      } else if (data.toLowerCase() == "all") {
        cartona += `
        <tr>
          <td>${el.customer_id}</td>
          <td>${el.name}</td>
          <td>${el.date}</td>
          <td>${el.amount}</td>
           </tr>
  `;
      }
    });

    rowdata.innerHTML = cartona;
    makeChart(arr);
  });

  input2.addEventListener("input", function () {
    const data = input2.value;
    let cartona = " ";
    transactions.forEach((el) => {
      if (String(el.amount).includes(data)) {
        cartona += `
        <tr>
          <td>${el.customer_id}</td>
          <td>${el.name}</td>
          <td>${el.date}</td>
          <td>${el.amount}</td>
           </tr>
  `;
      }
    });

    rowdata.innerHTML = cartona;
  });
}
function renderTable(data) {
  rowdata.innerHTML = " ";
  data.forEach((el) => {
    const html = `
     <tr>
    <td>${el.customer_id}</td>
    <td>${el.name}</td>
    <td>${el.date}</td>
    <td>${el.amount}</td>
  </tr>
`;
    rowdata.insertAdjacentHTML("beforeend", html);
  });
}

function makeChart(arr) {
  let chartCurrent = Chart.getChart("myChart");
  if (chartCurrent != undefined) {
    chartCurrent.destroy();
  }
  const ctx = document.getElementById("myChart");
  document.querySelector("#myChart").innerHTML = " ";

  setTimeout(() => {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: arr.map((el) => el.date),
        datasets: [
          {
            label: "Amount",
            data: arr.map((el) => el.amount),
            borderWidth: 1,
            backgroundColor: "#3f5b73",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, 200);
}
fetchData();
