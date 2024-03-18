import axiosInstance from '@axios';

export const fetchLast7Days = async () => {
  try {
    const response = await axiosInstance.get({
      parameters: {
        start_date: '2015-09-07',
        end_date: '2015-09-08',
      },
    });
    // eslint-disable-next-line no-console
    console.log('resposne:', response);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
