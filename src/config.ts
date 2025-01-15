type Config = {
	host: string;
	serverName?: string;
	i: string;
	master?: string;
	wsUrl: string;
	apiUrl: string;
	keywordEnabled: boolean;
	reversiEnabled: boolean;
	notingEnabled: boolean;
	chartEnabled: boolean;
	serverMonitoring: boolean;
	checkEmojisEnabled?: boolean;
	checkEmojisAtOnce?: boolean;
	geminiApiKey?: string;
	prompt?: string;
	aichatRandomTalkEnabled?: string;
	aichatRandomTalkProbability?: string;
	aichatRandomTalkIntervalMinutes?: string;
	mecab?: string;
	mecabDic?: string;
	memoryDir?: string;
	followAllowedHosts?: string[];
	followExcludeInstances?: string[];
	mazeEnable?: boolean;
	pollEnable?: boolean;
};

// import config from '../config.json' assert { type: 'json' };
import { readFile } from "fs/promises";
const config = JSON.parse(
	await readFile(new URL("../config.json", import.meta.url)),
);

config.wsUrl = config.host.replace("http", "ws");
config.apiUrl = config.host + "/api";

export default config as Config;
