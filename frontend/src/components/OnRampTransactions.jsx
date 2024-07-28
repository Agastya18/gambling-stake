import { Card } from "./cards";

export const OnRampTransactions = ({ transactions }) => {
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t, index) => (
          <div key={index} className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-orange-600 text-xs">
                {/* {t.time.toDateString()} */}
                {t.status}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
