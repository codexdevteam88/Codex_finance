export type Period = 
 | { type:'year'; year:number }
 | { type:'quarter'; year:number; quarter:1|2|3|4 }
 | { type:'month'; year:number; month:1|2|3|4|5|6|7|8|9|10|11|12 }

export const monthsOf = (q:1|2|3|4)=> q===1?[1,2,3]:q===2?[4,5,6]:q===3?[7,8,9]:[10,11,12]
export const fmt = (n:number)=> Number(n||0).toLocaleString('en-US')
