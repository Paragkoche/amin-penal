import {
  alpha,
  Box,
  Button,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  styled,
  useTheme,
} from "@mui/material";
import ApexCharts from "apexcharts";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Chart from "react-apexcharts";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import React from "react";
import { getAllExhibitor, getAllVisitor } from "../../Api";
export const OverviewTotalProfit = (props: any) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Vendors
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const OverviewTasksProgress = (props: any) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" gutterBottom variant="overline">
              Visitors
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const OverviewTotalCustomers = (props: any) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Delegates
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const OverviewBudget = (props: any) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Exhibitors
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ({ token }: { token: string }) => {
  const [visitors, setVisitors] = React.useState([]);
  const [exhibitor, setExhibitor] = React.useState([]);
  const [loding, setLoading] = React.useState(true);
  const theme = useTheme();
  React.useEffect(() => {
    getAllVisitor(token).then(
      async (data) => {
        let d = await data.json();
        console.log(d.data);

        setVisitors(d.data.rows);
      },
      (e) => {
        console.log(e);
      }
    );
    getAllExhibitor(token)
      .then(
        async (data) => {
          let d = await data.json();
          setExhibitor(d.data.rows);
        },
        (e) => {
          console.log(e);
        }
      )
      .finally(() => setLoading(false));
  }, []);
  console.log(visitors, exhibitor);

  return loding ? (
    <CircularProgress />
  ) : (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 20,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} lg={3} p={5}>
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: "100%" }}
              value={exhibitor.length}
            />
          </Grid>
          <Grid xs={12} sm={6} lg={3} p={5}>
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="0"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={3} p={5}>
            <OverviewTasksProgress
              sx={{ height: "100%" }}
              value={visitors.length}
            />
          </Grid>
          <Grid xs={12} sm={6} lg={3} p={5}>
            <OverviewTotalProfit sx={{ height: "100%" }} value="0" />
          </Grid>
        </Grid>
        <Grid xs={12} lg={8}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Visitor Overview" />
            <CardContent>
              <Chart
                width="100%"
                height={350}
                options={{
                  stroke: {
                    curve: "smooth",
                    width: [3, 3],
                  },
                }}
                series={[
                  {
                    type: "line",
                    data: [
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 1
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 2
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 3
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 4
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 5
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 6
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 7
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 8
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 9
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 10
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 11
                      ).length,
                      exhibitor.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 12
                      ).length,
                    ],
                  },
                  {
                    type: "line",
                    data: [
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 1
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 2
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 3
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 4
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 5
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 6
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 7
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 8
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 9
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 10
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 11
                      ).length,
                      visitors.filter(
                        (v: any) => new Date(v.createdAt).getMonth() == 12
                      ).length,
                    ],
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Card sx={{ height: "100%", margin: "20px 0" }}>
            <CardContent>
              <Chart
                width="100%"
                height={350}
                type="donut"
                options={{
                  colors: ["#F04438", "#F79009", "#06AED4", "#10B981"],
                  theme: {
                    mode: theme.palette.mode,
                  },
                  tooltip: {
                    fillSeriesColor: false,
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  labels: ["EXHIBITORS", "VISITORS", "DELEGATES", "VENDORS"],
                }}
                series={[exhibitor.length, visitors.length, 0]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Box>
  );
};
/* YASH BAHIYA KI KALAKARI*/

// import React, { Component } from "react";
// import Chart from "react-apexcharts";

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.updateCharts = this.updateCharts.bind(this);

//     this.state = {
//       optionsMixedChart: {
//         chart: {
//           id: "basic-bar",
//           toolbar: {
//             show: false
//           }
//         },
//         plotOptions: {
//           bar: {
//             columnWidth: "50%"
//           }
//         },
//         stroke: {
//           curve: "smooth",
//           width: [3, 3]
//         },
//         xaxis: {
//           categories: [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec"
//           ]
//         },
//         chart: {
//           type: 'area',
//           stacked: false,
//           height: 350,
//           zoom: {
//             type: 'x',
//             enabled: true,
//             autoScaleYaxis: true
//           },
//           toolbar: {
//             autoSelected: 'zoom'
//           }},
//         markers: {
//           size: 6,
//           strokeWidth: 3,
//           fillOpacity: 0,
//           strokeOpacity: 0,
//           hover: {
//             size: 8
//           }
//         },
//         yaxis: {
//           tickAmount: 5,
//           min: 0,
//           max: 100
//         }
//       },
//       seriesMixedChart: [
//         {
//           name: "this year",
//           type: "line",
//           data: [23, 12, 54, 61, 32, 56, 81, 19]
//         },
//         {
//           name: "last year",
//           type: "line",
//           data: [62, 12, 45, 55, 76, 41, 23, 43]
//         }
//       ],
//       optionsRadial: {
//        plotOptions: {
//            radialBar: {
//             startAngle: -135,
//             endAngle: 225,
//             hollow: {
//               margin: 0,
//               size: "70%",
//               background: "#fff",
//               image: undefined,
//               imageOffsetX: 0,
//               imageOffsetY: 0,
//               position: "front",
//               dropShadow: {
//                 enabled: true,
//                 top: 3,
//                 left: 0,
//                 blur: 4,
//                 opacity: 0.24
//               }
//             },
//             track: {
//               background: "#fff",
//               strokeWidth: "67%",
//               margin: 0, // margin is in pixels
//               dropShadow: {
//                 enabled: true,
//                 top: -3,
//                 left: 0,
//                 blur: 4,
//                 opacity: 0.35
//               }
//             },

//             dataLabels: {
//               showOn: "always",
//               name: {
//                 offsetY: -20,
//                 show: true,
//                 color: "#888",
//                 fontSize: "13px"
//               },
//               value: {
//                 formatter: function (val) {
//                   return val;
//                 },
//                 color: "#111",
//                 fontSize: "30px",
//                 show: true
//               }
//             }
//           }
//         },
//         fill: {
//           type: "gradient",
//           gradient: {
//             shade: "dark",
//             type: "horizontal",
//             shadeIntensity: 0.5,
//             gradientToColors: ["#ABE5A1"],
//             inverseColors: true,
//             opacityFrom: 1,
//             opacityTo: 1,
//             stops: [0, 100]
//           }
//         },
//         stroke: {
//           lineCap: "round"
//         },
//         labels: ["Percent"]
//       },
//       seriesRadial: [76],
//       optionsBar: {
//         chart: {
//           stacked: true,
//           stackType: "100%",
//           toolbar: {
//             show: false
//           }
//         },
//         plotOptions: {
//           bar: {
//             horizontal: true
//           }
//         },
//         dataLabels: {
//           dropShadow: {
//             enabled: true
//           }
//         },
//         stroke: {
//           width: 0
//         },
//         xaxis: {
//           categories: ["Fav Color"],
//           labels: {
//             show: false
//           },
//           axisBorder: {
//             show: false
//           },
//           axisTicks: {
//             show: false
//           }
//         },
//         fill: {
//           opacity: 1,
//           type: "gradient",
//           gradient: {
//             shade: "dark",
//             type: "vertical",
//             shadeIntensity: 0.35,
//             gradientToColors: undefined,
//             inverseColors: false,
//             opacityFrom: 0.85,
//             opacityTo: 0.85,
//             stops: [90, 0, 100]
//           }
//         },

//         legend: {
//           position: "bottom",
//           horizontalAlign: "right"
//         }
//       },
//       seriesBar: [
//         {
//           name: "blue",
//           data: [32]
//         },
//         {
//           name: "lightblue",
//           data: [41]
//         },
//         {
//           name: "yellow",
//           data: [12]
//         },
//         {
//           name: "red",
//           data: [65]
//         }
//       ]
//     };
//   }

//   updateCharts() {
//     const max = 90;
//     const min = 30;
//     const newMixedSeries = [];
//     const newBarSeries = [];

//     this.state.seriesMixedChart.forEach((s) => {
//       const data = s.data.map(() => {
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//       });
//       newMixedSeries.push({ data: data, type: s.type });
//     });

//     this.state.seriesBar.forEach((s) => {
//       const data = s.data.map(() => {
//         return Math.floor(Math.random() * (180 - min + 1)) + min;
//       });
//       newBarSeries.push({ data, name: s.name });
//     });

//     this.setState({
//       seriesMixedChart: newMixedSeries,
//       seriesBar: newBarSeries,
//       seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50]
//     });
//   }

//   render() {
//     return (
//       <div className="app">
//         <div className="row">
//           <div className="col mixed-chart">
//             <Chart
//               options={this.state.optionsMixedChart}
//               series={this.state.seriesMixedChart}
//               type="line"
//               width="500"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
