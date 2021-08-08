// noinspection HttpUrlsUsage,SpellCheckingInspection
export const defaultBpmn = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:bioc=\"http://bpmn.io/schema/bpmn/biocolor/1.0\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" id=\"Definitions_1\" targetNamespace=\"http://bpmn.io/schema/bpmn\"><bpmn:process id=\"Process_1\" name=\"پایانی\" isExecutable=\"false\"><bpmn:startEvent id=\"StartEvent_1\" name=\"آغازین\"><bpmn:outgoing>SequenceFlow_0xegl7w</bpmn:outgoing></bpmn:startEvent><bpmn:task id=\"Task_18fvqrd\" name=\"گام ۱\"><bpmn:incoming>SequenceFlow_0xegl7w</bpmn:incoming><bpmn:outgoing>SequenceFlow_0ubjkgy</bpmn:outgoing></bpmn:task><bpmn:task id=\"Task_0jo4nui\" name=\"گام ۲\"><bpmn:incoming>SequenceFlow_0ubjkgy</bpmn:incoming><bpmn:outgoing>SequenceFlow_1pafzam</bpmn:outgoing></bpmn:task><bpmn:sequenceFlow id=\"SequenceFlow_0xegl7w\" sourceRef=\"StartEvent_1\" targetRef=\"Task_18fvqrd\" /><bpmn:sequenceFlow id=\"SequenceFlow_0ubjkgy\" sourceRef=\"Task_18fvqrd\" targetRef=\"Task_0jo4nui\" /><bpmn:sequenceFlow id=\"SequenceFlow_1pafzam\" sourceRef=\"Task_0jo4nui\" targetRef=\"EndEvent_1grrchx\" /><bpmn:endEvent id=\"EndEvent_1grrchx\" name=\"پایانی\"><bpmn:incoming>SequenceFlow_1pafzam</bpmn:incoming></bpmn:endEvent></bpmn:process><bpmndi:BPMNDiagram id=\"BPMNDiagram_1\"><bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\"><bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\" bioc:stroke=\"green\" bioc:fill=\"rgba(50,255,105,0.4)\"><dc:Bounds x=\"173\" y=\"102\" width=\"36\" height=\"36\" /><bpmndi:BPMNLabel><dc:Bounds x=\"177\" y=\"145\" width=\"28\" height=\"14\" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id=\"Task_18fvqrd_di\" bpmnElement=\"Task_18fvqrd\" bioc:stroke=\"#0069ff\" bioc:fill=\"#fff\"><dc:Bounds x=\"259\" y=\"80\" width=\"100\" height=\"80\" /></bpmndi:BPMNShape><bpmndi:BPMNShape id=\"Task_0jo4nui_di\" bpmnElement=\"Task_0jo4nui\" bioc:stroke=\"#0069ff\" bioc:fill=\"#fff\"><dc:Bounds x=\"409\" y=\"80\" width=\"100\" height=\"80\" /></bpmndi:BPMNShape><bpmndi:BPMNShape id=\"EndEvent_1grrchx_di\" bpmnElement=\"EndEvent_1grrchx\" bioc:stroke=\"red\" bioc:fill=\"rgba(255,77,165,0.4)\"><dc:Bounds x=\"615\" y=\"102\" width=\"36\" height=\"36\" /><bpmndi:BPMNLabel><dc:Bounds x=\"622\" y=\"145\" width=\"25\" height=\"14\" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNEdge id=\"SequenceFlow_0xegl7w_di\" bpmnElement=\"SequenceFlow_0xegl7w\" bioc:stroke=\"black\" bioc:fill=\"rgba(0,0,0,0.4)\"><di:waypoint x=\"209\" y=\"120\" /><di:waypoint x=\"259\" y=\"120\" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id=\"SequenceFlow_0ubjkgy_di\" bpmnElement=\"SequenceFlow_0ubjkgy\" bioc:stroke=\"black\" bioc:fill=\"rgba(0,0,0,0.4)\"><di:waypoint x=\"359\" y=\"120\" /><di:waypoint x=\"409\" y=\"120\" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id=\"SequenceFlow_1pafzam_di\" bpmnElement=\"SequenceFlow_1pafzam\" bioc:stroke=\"black\" bioc:fill=\"rgba(0,0,0,0.4)\"><di:waypoint x=\"509\" y=\"120\" /><di:waypoint x=\"615\" y=\"120\" /></bpmndi:BPMNEdge></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>`;
