using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CarSpawner : MonoBehaviour
{

    public Car template;
    public GameObject channelHost;
    public int which = 0;
    private List<Channel> channels = new List<Channel>();

    private float cooldown;

    // Start is called before the first frame update
    void Start()
    {
        foreach (Transform child in channelHost.transform)
        {
            channels.Add(child.gameObject.GetComponent<Channel>());
        }
    }

    // Update is called once per frame
    void Update()
    {
        cooldown += Time.deltaTime;
        /**
         * Generation 200: optimal time to live
         */
        if(cooldown >= 0.8f)
        // if (cooldown >= temp)
        {
            Car dup = Instantiate(template);
            dup.bound = channels[which];
            dup.transform.parent = this.transform;
            // enable it
            dup.gameObject.SetActive(true);
            dup.transform.localPosition = new Vector3(dup.transform.localPosition.x, 1f, dup.transform.localPosition.z);
            cooldown = 0;
        }
    }
}
