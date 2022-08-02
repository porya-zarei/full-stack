import {EGROUPS_NAMES, IOrder} from "@/types/data";
import {FC} from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Pie} from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    ordersData: IOrder[];
}

const PieChart: FC<PieChartProps> = ({ordersData}) => {
    const priceForEachGroup = ordersData.reduce((data, order) => {
        const group = order.user.group;
        const price = order.products.reduce(
            (acc, product) => acc + Number(product.price) * product.count,
            0,
        );
        if (data[group]) {
            data[group] += price;
        } else {
            data[group] = price;
        }
        return data;
    }, {} as Record<string, number>);
    const data = {
        labels: Object.keys(priceForEachGroup).map(
            (group) => EGROUPS_NAMES[Number(group)],
        ),
        datasets: [
            {
                label: "# of Votes",
                data: Object.values(priceForEachGroup),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className="w-full h-full flex justify-start items-start">
            <Pie className="w-full h-full" data={data} />
        </div>
    );
};

export default PieChart;
