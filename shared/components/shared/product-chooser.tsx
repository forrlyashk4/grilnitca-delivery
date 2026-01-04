import React from "react";

export interface ProductChooserProps {
  options: Set<number>;
  optionLabels: Record<number, string>;
  optionState: number;
  setOptionState: (nextValue: number) => void;
  className?: string;
}

export const ProductChooser: React.FC<ProductChooserProps> = ({
  options,
  optionLabels,
  optionState,
  setOptionState,
}) => {
  const optionsCount = options.size;
  return (
    <div className="bg-gray-100 rounded-xl flex justify-evenly border text-sm my-2">
      {Array.from(options).map((item) => {
        return (
          <div
            key={item}
            onClick={() => setOptionState(item)}
            className={`flex items-center justify-center text-center cursor-pointer flex-1 w-[${Math.floor(
              100 / optionsCount
            )}%] py-1 px-5 rounded-xl transition-all duration-400 ${
              item === optionState ? "bg-white" : "opacity-50"
            }`}
          >
            {optionLabels[item]}
          </div>
        );
      })}
    </div>
  );
};
