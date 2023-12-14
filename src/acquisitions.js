import Chart from 'chart.js/auto'

const req = new XMLHttpRequest();
req.addEventListener("load", evt => {
  let json = JSON.parse(req.responseText);
  console.log(json[2].data);
  let data = json[2].data
//    
      let satCount = 0;
      let unsatCount = 0;
      let unkwCount = 0;

      data.forEach(entry => {
        if (entry.status === "SAT") {
          satCount++;
        } else if (entry.status === "UNSAT") {
          unsatCount++;
        } else {
          unkwCount++;
        }
      });

      var ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Résolus', 'Non résolus', 'Inconnus'],
          datasets: [{
            data: [satCount, unsatCount, unkwCount],
            backgroundColor: ['rgba(75, 192, 192, 0.9)', 'rgba(255, 99, 132, 0.9)' , 'rgba(65, 65, 65, 0.9)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(65, 65, 65, 1)'],
            borderWidth: 1,
          }]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'white' 
              }
            },
            title: {
              display: true,
              text: "Résultats totaux de l'ensemble des puzzle",
              color: 'white'
            }
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      });

/////

      let satParBot = {};
      let unsatParBot = {};

    data.forEach(table => {
        if (table.status === "SAT") {
          if (satParBot[table.name]) {
            satParBot[table.name]++;
          } else {
            satParBot[table.name] = 1;
          }
        } else if (table.status === "UNSAT") {
          if (unsatParBot[table.name]) {
            unsatParBot[table.name]++;
          } else {
            unsatParBot[table.name] = 1;
          }
    }});


    
/////    
  function sortByKey(array, key) {
    return array.sort(function(a, b) {
      var x = b[key];
      var y = a[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  };

  function satCountf(table) {
      let compteursat = [];

      table.forEach(x => {
      if (x.status === "SAT") {
        let existingRobot = compteursat.find(robot => robot.name === x.name);
        if (existingRobot) {
          existingRobot.score = existingRobot.score + 1;
        } else {
          let nouveau = {
            name: x.name,
            score: 1
          }
          compteursat.push(nouveau);
        }
    }})
    return sortByKey(compteursat, "score")
  };
  
  function unsatCountf(table) {
        let compteurunsat = [];

        table.forEach(x => {
        if (x.status === "UNSAT") {
          let existingRobot = compteurunsat.find(robot => robot.name === x.name);
          if (existingRobot) {
            existingRobot.score = existingRobot.score + 1;
          } else {
            let nouveau = {
              name: x.name,
              score: 1
            }
            compteurunsat.push(nouveau);
          }
      }})
      return sortByKey(compteurunsat, "score")
  };

  function datascore(tab) {
    let tabscore =[];
    tab.forEach(x => {
      tabscore.push(x.score)
    })
    return tabscore
  };

  function datanames(tab) {
    let tabscore =[];
    tab.forEach(x => {
      tabscore.push(x.name)
    })
    return tabscore
  };

  function datafamily(tab) {
    let tabscore =[];
    tab.forEach(x => {
      tabscore.push(x.family)
    })
    return tabscore
  };

  function familysat(tab) {
    let tabscore =[];
    tab.forEach(x => {
      tabscore.push(x.sat)
    })
    return tabscore
  };

  function familyunsat(tab) {
    let tabscore =[];
    tab.forEach(x => {
      tabscore.push(x.unsat)
    })
    return tabscore
  };
    

  function timeToDecimal(time) {
    return parseFloat(time);
  }

  function moyennetemps(table) {
    let tab = [ ];
    
    table.forEach(x => {
      
    if (x.status === "SAT") {
      let existingRobot = tab.find(robot => robot.name === x.name);

      if (existingRobot) {
        existingRobot.time =+ timeToDecimal(x.time);
        existingRobot.test++
      } else {
        let nouveau = {
          name: x.name,
          time: timeToDecimal(x.time),
          test: 1
        }
        tab.push(nouveau);
      }
  }
  tab.forEach(robot => {
    robot.Time = robot.time / robot.test;
  });
    })
  return sortByKey(tab, "score")
};

function dataproblem(tab) {
  let problems = [];

  tab.forEach(x => {
    if (x.status === "UNSAT") {
      let existingProblem = problems.find(problem => problem.family === x.family);
      if (existingProblem) {
        existingProblem.unsat = ++existingProblem.unsat;
      } else {
        let nouveau = {
          family: x.family,
          unsat: 1,
          sat: 0
        };
        problems.push(nouveau);
      }
    } else if (x.status === "SAT") {
      let existingProblem = problems.find(problem => problem.family === x.family);
      if (existingProblem) {
        existingProblem.sat = ++existingProblem.sat;
      } else {
        let nouveau = {
          family: x.family,
          unsat: 0,
          sat: 1
        };
        problems.push(nouveau);
      }
    }
  });

  return problems;
}

console.log(dataproblem(data))
console.log(familysat(dataproblem(data)))

var ctx = document.getElementById('dimensions');
var dimensions = new Chart(ctx, {
  type: "bar",
  data: {
    labels: datanames(satCountf(data)),
    datasets: [{
      label: 'Résolus',
      data: datascore(unsatCountf(data)),
      backgroundColor: 'rgba(255, 99, 132, 1)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1
    }, {
      label: 'Non résolus',
      data: datascore(satCountf(data)),
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: 'white' 
        }},
      title: {
        display: true,
        text: 'Différence entre les problèmes totaux résolus ou non',
        color: 'white',
        fontSize: 16
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: 'white' 
        },
        grid: {
          color: 'white'
        }
      },
      y: {
        beginAtZero: true,
        stacked: true,
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'white'
        }
      }
    }
  }
});

  

        var ctx = document.getElementById('slide');
        let tabIndex= 0;
        let previous = document.getElementById('previous')
        let next = document.getElementById('next')
        next.addEventListener("click", function() {
          tabIndex++
          if(datafamily(dataproblem(data)).length < tabIndex) {
            tabIndex = 0
          }
          console.log(tabIndex)
        })

        datascore(satCountf(data))
        previous.addEventListener("click", function() {
          tabIndex--
          if( 0 > tabIndex) {
            tabIndex = datafamily(dataproblem(data)).length
          }
          console.log(tabIndex)
        })

        var dimensions = new Chart(ctx, {
          type: "bar",
          data: {
            labels: datafamily(dataproblem(data)),
            datasets: [
              {
                label: 'Résolus',
                data: familysat(dataproblem(data)),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2
              },
              {
                label: 'Non résolus',
                data: familyunsat(dataproblem(data)),
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2
              }
            ]
          },
          options: {
            plugins: {
              legend: {
                labels: {
                  color: 'white' 
                }},
              title: {
                display: true,
                text: 'Nombre de solution trouvé ou non de chaque puzzle',
                color: 'white'
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: { 
              x: {
                ticks: {
                  color: 'white' 
                },
                grid: {
                  color: 'white' 
                }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: 'white'
                },
                grid: {
                  color: 'white'
                }
              }
            }
          }
        });
        
   
  
/////////









    });
req.open("GET", "https://www.cril.univ-artois.fr/~lecoutre/teaching/jssae/code5/results.json");
req.send()