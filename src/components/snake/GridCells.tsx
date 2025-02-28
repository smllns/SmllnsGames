import { GridCellsProps } from '@/lib/typesAndConstants';

// GridCells component responsible for rendering each cell of the grid
const GridCells: React.FC<GridCellsProps> = ({
  gridSize,
  snake,
  food,
  gridBorderColor,
  snakeColor,
  foodEmoji,
}) => {
  return (
    <>
      {/* Render each grid cell */}
      {Array.from({ length: gridSize * gridSize }).map((_, index) => {
        const x = index % gridSize; // Calculate the x-coordinate based on index
        const y = Math.floor(index / gridSize); // Calculate the y-coordinate based on index
        const isSnake = snake.some(
          (segment) => segment.x === x && segment.y === y // Check if this cell is part of the snake
        );
        const isFood = food.x === x && food.y === y; // Check if this cell contains food

        return (
          <div
            key={index}
            className='w-full rounded-sm h-full'
            style={{
              backgroundColor: gridBorderColor,
              position: 'relative',
            }}
          >
            {/* Render snake body segments */}
            {isSnake && (
              <div
                className='relative rounded-md'
                style={{
                  backgroundColor: snakeColor,
                  width: '100%',
                  height: '100%',
                }}
              >
                {/* Special rendering for the snake's head */}
                {snake[0].x === x && snake[0].y === y && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '20%',
                      left: '20%',
                      right: '20%',
                      bottom: '20%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Render eye emojis for the snake's head */}
                    {Array(2)
                      .fill(null)
                      .map((_, idx) => (
                        <div
                          key={idx}
                          className={`${
                            gridSize === 20
                              ? 'zero:text-[5px] xs:text-[8px] lg:text-sm'
                              : 'zero:text-xs xs:text-sm sm:text-xl '
                          }`}
                          style={{
                            width: '30%',
                            height: '30%',
                          }}
                        >
                          👁️
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* Render food if this cell contains food */}
            {isFood && (
              <span
                className='text-xl sm:text-4xl'
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {foodEmoji}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
};

export default GridCells;
