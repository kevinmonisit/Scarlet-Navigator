//accepts a color and list of cores and displays them

import clsx from 'clsx';

interface CoreListProps {
  color: string;
  cores: string[];
  handleRemoveCore?: (core: string) => void;
  handleOnClick?: (core: string) => void;
}

function CoreList(props: CoreListProps) {
  const { color, cores, handleRemoveCore, handleOnClick } = props;

  return (
    <div className='flex flex-wrap gap-2'>
      {cores.map((core) => (
        <div
          key={core}
          onClick={() => {
            if (handleOnClick) {
              handleOnClick(core);
            }
          }}
          className={clsx(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            `bg-${color}-100`,
            `text-${color}-800`,
            handleOnClick ? 'cursor-pointer' : 'cursor-default'
          )}
        >
          {core}
          {/*
            We don't want to show the remove button if the core is capable of being clicked
           */}
          {handleRemoveCore && !handleOnClick && (
            <button
              type='button'
              onClick={() => handleRemoveCore(core)}
              className='ml-1 text-blue-400 hover:text-blue-600'
            >
              x
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CoreList;
