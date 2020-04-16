export const default_weekdays = [
    {
      title: 'sleep',
      id: 1,
      start: '0000',
      end: '0630',
      exclusivity: false,
      compressibility: true, 
      urgent:  false,
      importance: 8    
  },
    {
      title: 'morning_care',
      id: 2,
      start: '0630',
      end: '0635',
      exclusivity: false,
      compressibility: true,
      urgent:  false,
      movable: false,
      importance: 8    
  },
    {
      title: 'breakfast',
      id: 3,
      start: '0635',
      end: '0650',
      exclusivity: true,
      compressibility: true,
      urgent:  false,
      movable: false,
      importance: 8    
  },
    {
      title: 'lanch',
      id: 4,
      start: '1200',
      end: '1230',
      exclusivity: true,
      compressibility: true,
      urgent:  false,
      movable: true,
      importance: 8    
  },
    {
      title: 'job',
      id: 5,
      start: '1230',
      end: '1330',
      exclusivity: true,
      compressibility: true,
      urgent:  false,
      movable: true,
      importance: 8    
  },  
    {
      title: 'dinner',
      id: 6,
      start: '1800',
      end: '1830',
      exclusivity: true,
      compressibility: true,
      urgent:  false,     
      movable: true,
      importance: 8    
  },
    {
      title: 'evening_sleep',
      id: 7,
      start: '2300',
      end: '2400',
      exclusivity: false,
      compressibility: true,
      urgent:  false,
      movable: false,
      importance: 8    
  },
]

export const default_weekends = [
  {
    title: 'sleep',
    id: 1,
    start: '0000',
    end: '0630',
    exclusivity: false,
    compressibility: true, 
    urgent:  false,
    movable: false,
    importance: 8    
},
  {
    title: 'morning_care',
    id: 2,
    start: '0630',
    end: '0635',
    exclusivity: false,
    compressibility: true,
    urgent:  false,
    movable: false,
    importance: 8    
},
  {
    title: 'breakfast',
    id: 3,
    start: '0635',
    end: '0650',
    exclusivity: true,
    compressibility: true,
    urgent:  false,
    movable: false,
    importance: 8    
},
  {
    title: 'lanch',
    id: 4,
    start: '1200',
    end: '1230',
    exclusivity: true,
    compressibility: true,
    urgent:  false,
    movable: true,
    importance: 8    
},  
  {
    title: 'dinner',
    id: 5,
    start: '1800',
    end: '1830',
    exclusivity: true,
    compressibility: true,
    urgent:  false,
    movable: true,
    importance: 8    
},
  {
    title: 'evening_sleep',
    id: 6,
    start: '2300',
    end: '2400',
    exclusivity: false,
    compressibility: true,
    urgent:  false,
    movable: false,
    importance: 8    
},
]
