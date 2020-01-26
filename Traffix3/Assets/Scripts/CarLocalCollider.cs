using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CarLocalCollider : MonoBehaviour
{

    private Car parent;

    // Start is called before the first frame update
    void Start()
    {
        parent = transform.parent.GetComponent<Car>();
    }

    // Update is called once per frame
    void Update()
    {
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.tag != "Player")
            return;

        parent.vel = 0f;
        parent.vel *= Car.DAMP_FACTOR;
        print("local other entered: ");
        print(other);
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.tag != "Player")
            return;

        parent.vel = 1f;
    }
}
