import React, { FC } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useGetUsersAnalyticeQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";
import LoaderOne from "../../Loader/LoaderOne";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticeQuery({});
  const analyticsData: any = [];

  data &&
    data.userAnalytic.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });
  // const analyticsData = [
  //     { name: "January 2023", count: 440 },
  //     { name: "February 2023", count: 8200 },
  //     { name: "March 2023", count: 4033 },
  //     { name: "April 2023", count: 4502 },
  //     { name: "May 2023", count: 2042 },
  //     { name: "Jun 2023", count: 3454},
  //     { name: "July 2023", count: 356},
  //     { name: "Aug 2023", count: 5667 },
  //     { name: "Sept 2023", count: 1320 },
  //     { name: "Oct 2023", count: 6526 },
  //     { name: "Nov 2023", count: 5480 },
  //     { name: "December 2023", count: 485},
  //     ];
  return (
    <>
      {isLoading ? (
        <LoaderOne />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px] pl-10"
              : "mt-[50px] text-white shadow-sm pb-5 rounded-sm"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px] !text-[#C8EA80]"
              } px-5 pl-20 !text-start !text-[#C8EA80]`}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} pl-20 px-5`}>
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3FAF82"
                  fill="#3FAF82"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
