document.addEventListener("DOMContentLoaded", function () {
  let myBarChart;

  document
    .getElementById("chart-tab")
    .addEventListener("shown.bs.tab", function () {
      if (myBarChart) {
        myBarChart.destroy();
      }
      const ctx = document.getElementById("myBarChart").getContext("2d");
      myBarChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Income",
              data: getMonthlyValues("income"),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Expenses",
              data: getMonthlyValues("expenses"),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
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
    });

  function getMonthlyValues(type) {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    return months.map((month) => {
      const input = document.getElementById(`${type}-${month}`);
      return input ? parseFloat(input.value) || 0 : 0;
    });
  }
});
