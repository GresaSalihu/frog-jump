
/**
 * @param {number[]} stones
 * @return {boolean}
 */
export const canCross = function (stones, position) {

    const memoizationMap = new Map();

    function jumpHelper(index, jump) {
        if (index === stones.length - 1) {
            return true;
        }

        const key = index + "-" + jump;
        if (memoizationMap.has(key)) return memoizationMap.get(key);


        let result = false;


        for (let j = Math.max(1, jump - 1); j <= jump + 1; j++) {
            if (j === 0) continue;


            const newStone = stones[index] + j;
            const indexNew = findIndex(stones, newStone);

            if (indexNew !== -1) {
                if (jumpHelper(indexNew, j)) {
                    position.push(`${stones[index]}`);
                    result = true;
                }
            }
        }

        memoizationMap.set(key, result);

        return result;
    }


    function findIndex(stone, searchValue, left = 0, right = stone.length - 1) {
        if (left > right) {
            return -1;
        }

        const mid = left + Math.floor((right - left) / 2);

        if (stone[mid] === searchValue) {
            return mid;
        } else if (stone[mid] > searchValue) {
            return findIndex(stone, searchValue, left, mid - 1);
        } else {
            return findIndex(stone, searchValue, mid + 1, right);
        }
    }

    if (stones[1] !== 1) return false;

    return jumpHelper(1, 1);
};