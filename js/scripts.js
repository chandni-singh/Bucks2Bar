document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const chartTab = document.getElementById("chart-tab");
  const downloadButton = document.getElementById("download");
  const sendEmailButton = document.getElementById("send-email");
  const canvas = document.getElementById("myBarChart");

  usernameInput.addEventListener("input", () => {
    const username = usernameInput.value;
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    usernameInput.style.borderColor = regex.test(username) ? "green" : "red";
  });

  let myBarChart;

  chartTab.addEventListener("shown.bs.tab", () => {
    if (myBarChart) {
      myBarChart.destroy();
    }
    const ctx = canvas.getContext("2d");
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

  downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "chart.png";
    link.click();
  });

  sendEmailButton.addEventListener("click", () => {
    const email = document.getElementById("email-address").value;
    // if (email) {
    const chartImage = canvas.toDataURL("image/png");
    fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, chartImage }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // }
  });

  const getMonthlyValues = (type) => {
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
  };
});
