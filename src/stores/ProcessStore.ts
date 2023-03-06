import { observable, action } from 'mobx';
import { Request } from '~/utils';
import { Constants } from '~/common';
import axios from 'axios';

export type TVideo = {
    uri: string;
    name: string;
    type: string;
};

export type TStatus = 'ready' | 'uploaded' | 'processing' | 'done' | 'error';

export type TResult = {
    video_id: number;
    scape_name?: string;
    prediction?: number;
    revisitation?: number;
    loudness?: number;
    video_data?: any;
    thumbnail? : string;
    uploaded_at?: string;
    predicted_at?: string;
    status: TStatus;
};

export const ProcessStore = observable({
    results: [] as TResult[],
    result: {} as TResult,
    isUploading: false,
    data: {
        video: {
            uri: '',
            name: '',
            type: ''
        } as TVideo,
        revisitation: 0,
        loudness: 0,
        device: {
            brand: '',
            model: '',
        } as any,
    },
    survey: {} as any,

    init: action(() => {
        ProcessStore.results = [] as TResult[];
        ProcessStore.result = {} as TResult;
        ProcessStore.isUploading = false;
        ProcessStore.data = {
            video: {
                uri: '',
                name: '',
                type: ''
            } as TVideo,
            revisitation: 0,
            loudness: 0,
            device: {
                brand: '',
                model: '',
            } as any,
        };
        ProcessStore.survey = {} as any;
    }),

    fetchResults: action(async () => {
        const res = (await Request.get('/result'));
        console.log(res)
        ProcessStore.results = res;
    }),
    resetResults: action(() => {
        ProcessStore.results = [];
        console.log(ProcessStore.results)
    }),

    resetResult: action(() => {
        ProcessStore.result = {} as TResult;
    }),

    fetchResult: action(async (video_id: number) => {
        const res = (await Request.get(`/result/${video_id}`));
        ProcessStore.result = res;
    }),

    resetData: action(() => {
        ProcessStore.data = {
            video: {
                uri: '',
                name: '',
                type: ''
            },
            revisitation: 0,
            loudness: 0,
            device: {
                brand: Constants.device.brand,
                model: Constants.device.model,
            }
        }
    }),

    setVideo: action((video: TVideo) => {
        console.log('set video', video);
        ProcessStore.data.video = video;
    }),
    setRevisitation: action((revisitation: number) => {
        ProcessStore.data.revisitation = revisitation;
    }),
    setLoudness: action((loudness: number) => {
        ProcessStore.data.loudness = loudness;
    }),

    upload: action(async () => {
        console.log('uploading...');
        ProcessStore.isUploading = true;

        let results = ProcessStore.results;
        results.push({ video_id: -1, status: 'ready' });
        ProcessStore.results = results;
        const index = ProcessStore.results.length - 1;

        const formData = new FormData();
        formData.append("video", ProcessStore.data.video);
        formData.append("revisitation", ProcessStore.data.revisitation);
        formData.append("loudness", ProcessStore.data.loudness);
        formData.append("device", Constants.device.brand + '_' + Constants.device.model);
        formData.append("survey", JSON.stringify(ProcessStore.survey));
        const res = (await Request.post('/upload/video', formData));
        const video_id = res.video_id;
        ProcessStore.resetData();

        ProcessStore.results[index] = { video_id, status: 'uploaded', uploaded_at: res.uploaded_at };

        console.log('uploaded', video_id);

        ProcessStore.process(index);
        // ProcessStore.fetchResults();

        ProcessStore.isUploading = false;

        return video_id;
    }),

    process: action(async (index: number) => {
        console.log('processing:', index);

        const video_id = ProcessStore.results[index].video_id;
        // ProcessStore.results[index].status = 'processing';
        const res = (await Request.get('/process/video', { video_id }));
        let result = ProcessStore.results[index];
        // result = { ...res, status: 'done' };
        // ProcessStore.results[index] = result;
        ProcessStore.fetchResults();

        console.log('processed');
    }),
});

